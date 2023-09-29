const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const { cookies } = req;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded.email !== foundUser.email) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign(
      {
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        roles: [...foundUser.roles],
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
