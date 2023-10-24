const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { handleAsync } = require("../../../helpers/handleAsyncError");
const CustomError = require("../../../utils/error.custom");

const handleRefreshToken = handleAsync(async (req, res, next) => {
  const { cookies } = req;

  if (!cookies?.jwt)
    return next(new CustomError("Please log in again to get access", 401));
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser)
    return next(new CustomError("Access Denied! Inavlid token", 403));
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded.email !== foundUser.email) {
      // return res.sendStatus(403);
      return next(new CustomError("Access Denied! Invalid token", 403));
    }
    const accessToken = jwt.sign(
      {
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        userId: foundUser._id,
        roles: [...foundUser.roles],
        avatar: foundUser.avatar,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    res.json({ accessToken });
  });
});

module.exports = { handleRefreshToken };
