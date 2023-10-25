const User = require("../models/User");
const cookieOptions = require("../config/cookieOptions");
const { handleAsync } = require("../helpers/handleAsyncError");

const handleLogout = handleAsync(async (req, res, next) => {
  const { cookies } = req;

  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", cookieOptions);
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";

  await foundUser.save();

  if (process.env.NODE_ENV === "production") {
    res.clearCookie("jwt", { ...cookieOptions, secure: true });
  } else {
    res.clearCookie("jwt", cookieOptions);
  }

  //OK but no content to send back
  return res.sendStatus(204);
});

module.exports = { handleLogout };
