const jwt = require("jsonwebtoken");
const User = require("../models/user");

const generateAuthTokens = async (user, res) => {
  const refreshToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_REFRESH_SECRET
  );
  const accessToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("accessJWT", accessToken, cookieOptions);
  return { refreshToken, accessToken };
};

const auth = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new error();
    }

    req.token = accessToken;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate properly." });
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      res
        .status(403)
        .send({ error: "You do not have permission to perform this action." });
    }
    next();
  };
};

module.exports = {
  auth,
  restrictTo,
  generateAuthTokens,
};
