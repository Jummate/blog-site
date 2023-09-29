const path = require("path");
const userRoles = require("../config/userRoles");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const getRegistrationPage = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "..", "..", "public", "register.html"));
  } catch (err) {
    console.error(err);
  }
};

const createUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate)
    return res.status(409).json({ message: "Email already taken" });

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = {
      firstName,
      lastName,
      email,
      roles: [userRoles.ADMIN, userRoles.EDITOR],
      password: hashedPwd,
    };

    const result = await User.create(newUser);

    res.status(201).json({
      message: `New user (${firstName} ${lastName}) created successfully`,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getRegistrationPage, createUser };
