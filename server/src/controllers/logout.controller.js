const User = require("../models/User");
const cookieOptions = require("../config/cookieOptions");

const handleLogout = async (req, res) => {
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

  // !!!!! Add secure:true in production to make it serve only on https protocol
  res.clearCookie("jwt", cookieOptions);

  //OK but no content to send back
  return res.sendStatus(204);
};

module.exports = { handleLogout };
