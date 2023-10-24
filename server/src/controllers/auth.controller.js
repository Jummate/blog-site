const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieOptions = require("../config/cookieOptions");
const User = require("../models/User");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }
  const potentialUser = await User.findOne({ email }).exec();
  if (!potentialUser)
    return res.status(401).json({ message: "Record not found" });

  const matchedPwd = await bcrypt.compare(password, potentialUser.password);
  if (matchedPwd) {
    //use expiry time of 5 or 15mins for access token in production

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

    //use longer days for refresh token in production
    //add "secure" and set to true i.e. secure=true
    //add sameSite and set to strict i.e. sameSite='strict'
    res.cookie("jwt", refreshToken, {
      ...cookieOptions,
      maxAge: process.env.REFRESH_TOKEN_EXPIRY,
    });

    res.status(200).json({ accessToken, message: "Logged in successfully!" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = { handleLogin };
