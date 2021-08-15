const sharp = require("sharp");
const multer = require("multer");
const crypto = require("crypto");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const {
  sendWelcomeEmail,
  sendByeByeEmail,
  passwordChangeEmail,
  passwordChangedEmail,
} = require("../emails/user");
const { generateAuthTokens } = require("../middleware/auth");

exports.SignUp = catchAsync(async (req, res, next) => {
  const user = new User(req.body);
  const tokens = await generateAuthTokens(user, res);
  user.token = tokens.refreshToken;
  user.isVerified = false;
  user.emailToken = crypto.randomBytes(64).toString("hex");

  await user.save({ runValidators: true });
  await sendWelcomeEmail(
    user.email,
    user.name,
    user.emailToken,
    req.headers.host
  );
  res.status(200).send({
    refreshToken: tokens.refreshToken,
    accessToken: tokens.accessToken,
    user,
  });
});

exports.verification = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ emailToken: req.query.token });

  if (!user) {
    throw new error();
  }

  user.isVerified = true;
  user.emailToken = null;
  await user.save();
  res.status(200).send();
});

exports.LogIn = catchAsync(async (req, res, next) => {
  const user = await User.findByCredentials(req.body.email, req.body.password);
  const tokens = await generateAuthTokens(user, res);
  res.status(200).send({
    refreshToken: tokens.refreshToken,
    accessToken: tokens.accessToken,
    user,
  });
});

exports.LogOut = catchAsync(async (req, res, next) => {
  const refreshToken = req.header("Authorization").replace("Bearer ", "");
  const user = await User.findByRefreshToken(refreshToken);
  user.token = null;
  await user.save();
  res.send();
});

exports.tokenRefresh = catchAsync(async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken == null) return res.sendStatus(401);
  const decoded = jwt.verify(refreshToken, process.env.JWT_ACCESS_SECRET);
  const user = await User.findByRefreshToken(decoded._id);

  if (!user) {
    throw new error();
  }

  const accessToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return accessToken;
});

exports.readUser = catchAsync(async (req, res, next) => {
  res.send(req.user);
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await req.user.remove();
  await sendByeByeEmail(req.user.email, req.user.name);
  res.send();
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const update = Object.keys(req.body);
  const allowedUpdated = ["name", "email", "DoB", "gender", "avatar"]; // Roles??
  const isValidObject = update.every((update) =>
    allowedUpdated.includes(update)
  );

  if (!isValidObject) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  update.forEach((updates) => (req.user[updates] = req.body[updates]));
  await req.user.save();
  res.send(req.user);
});

// Avatar handling setup
const avatar = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("please insert a picture"));
    }

    cb(undefined, true);
  },
});

exports.uploadUserAvatar = avatar.single("avatar");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.user.avatar = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize({ width: 500, height: 500 })
    .png()
    .toFile("./public/" + `${req.user.avatar}`)
    .then(console.log("image saved"))
    .catch((e) => console.log(e));

  next();
});

// Password handling Routes
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(res.status(404).send({ error: "Not Found!" }));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    await passwordChangeEmail(user.email, resetToken);
    res.status(200).send();
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      res.status(400).send({
        error: "There was an error sending the email. Try again later!",
      })
    );
  }
});

// Reset Password
exports.resetPassword = catchAsync(async (req, res, next) => {
  // console.log(req.body)
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      res.status(400).send({ error: "Token is invalid or has expired!" })
    );
  }
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  await passwordChangedEmail(user.email);
  next();
});

// Update Password
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.comparePasswords(req.body.passwordCurrent, user.password))) {
    return next(
      res.status(401).send({ error: "Your current password is wrong." })
    );
  }

  user.password = req.body.password;
  await user.save();
  await passwordChangedEmail(user.email);
  next();
});
