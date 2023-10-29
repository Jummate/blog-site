const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieOptions = require("../config/cookieOptions");
const User = require("../models/User");
const { handleAsync } = require("../helpers/handleAsyncError");
const CustomError = require("../utils/error.custom");

const handleLogin = handleAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError("Email and password are required.", 400));
  }
  const potentialUser = await User.findOne({ email }).exec();
  if (!potentialUser) return next(new CustomError("Record not found", 401));

  const matchedPwd = await bcrypt.compare(password, potentialUser.password);
  if (matchedPwd) {
    const accessToken = jwt.sign(
      {
        email: potentialUser.email,
        firstName: potentialUser.firstName,
        lastName: potentialUser.lastName,
        userId: potentialUser._id,
        roles: [...potentialUser.roles],
        avatar: potentialUser.avatar,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    const refreshToken = jwt.sign(
      {
        email: potentialUser.email,
        firstName: potentialUser.firstName,
        lastName: potentialUser.lastName,
        userId: potentialUser._id,
        avatar: potentialUser.avatar,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    potentialUser.refreshToken = refreshToken;

    await potentialUser.save();

    if (process.env.NODE_ENV === "production") {
      res.cookie("jwt", refreshToken, {
        ...cookieOptions,
        maxAge: process.env.REFRESH_TOKEN_EXPIRY,
        secure: true,
        sameSite: "strict",
      });
    } else {
      res.cookie("jwt", refreshToken, {
        ...cookieOptions,
        maxAge: process.env.REFRESH_TOKEN_EXPIRY,
      });
    }

    res.status(200).json({ accessToken, message: "Logged in successfully!" });
  } else {
    // res.status(401).json({ message: "Invalid credentials" });
    return next(new CustomError("Invalid credentials", 401));
  }
});

module.exports = { handleLogin };
