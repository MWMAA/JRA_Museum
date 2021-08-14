const mongoose = require("mongoose");
const validate = require("validator");
const crypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate: [validate.isEmail, "Please provide a valid email"],
    },
    password: {
      required: true,
      type: String,
      trim: true,
      minlength: 8,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password shouldnt include the word "Password"');
        }
      },
    },
    roles: {
      type: String,
      enum: ["user", "editor", "admin"],
      default: "user",
    },
    DoB: Date,
    Activated: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "default.jpg",
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.roles;
  delete userObject.passwordChangedAt;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;

  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login!");
  }

  const isMatch = await crypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login!");
  }

  return user;
};

userSchema.methods.comparePasswords = async (
  candidatePassword,
  userPassword
) => {
  return await crypt.compare(candidatePassword, userPassword);
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await crypt.hash(user.password, 12);
  }
  next();
});

userSchema.pre("save", function (next) {
  if (this.isModified("password") && this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
  }
  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
