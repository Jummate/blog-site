const path = require("path");
const userRoles = require("../config/userRoles");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const convertToBase64 = require("../helpers/convertToBase64");
const handleUpload = require("../helpers/imageUpload");

const getRegistrationPage = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "..", "..", "public", "register.html"));
  } catch (err) {
    console.error(err);
  }
};

const resetPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.params;

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Old and new passwords are required." });
  }
  if (!id) return res.status(400).json({ message: "ID parameter is required" });

  const foundUser = await User.findOne({ _id: id }).exec();
  if (!foundUser) return res.status(400).json({ message: "Record not found" });

  const matchedPwd = await bcrypt.compare(oldPassword, foundUser.password);

  if (!matchedPwd)
    return res.status(400).json({ message: "Incorrect old password" });

  const hashedNewPwd = await bcrypt.hash(newPassword, 10);
  foundUser.password = hashedNewPwd;
  await foundUser.save();

  res.status(200).json({ message: "Password successfully changed" });
};

const createUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const { buffer, mimetype } = req.file;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate)
    return res.status(409).json({ message: "Email already taken" });

  try {
    const config = {
      folder: "users",
    };
    const dataURI = convertToBase64(buffer, mimetype);
    const cldRes = await handleUpload(dataURI, config);
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = {
      firstName,
      lastName,
      email,
      roles: [userRoles.ADMIN, userRoles.EDITOR],
      password: hashedPwd,
      avatar: cldRes.secure_url,
    };

    const result = await User.create(newUser);

    res.status(201).json({
      message: `New user (${firstName} ${lastName}) created successfully`,
    });
  } catch (err) {
    console.error(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "ID parameter is required" });

    let result;

    if (req.file) {
      //   const { originalname, path: filePath } = req.file;
      //   const ext = path.extname(originalname);
      //   const newPath = `${filePath}${ext}`;
      //   await fsPromises.rename(filePath, newPath);
      const { buffer, mimetype } = req.file;
      const dataURI = convertToBase64(buffer, mimetype);
      const cldRes = await handleUpload(dataURI);
      result = await editUser(req, res, id, cldRes.secure_url);
    } else {
      result = await editUser(req, res, id);
    }

    res.status(200).json({ message: "User updated successfully", result });
  } catch (err) {
    console.log(err);
  }
};

const editUser = async (req, res, userId, newPath = undefined) => {
  const { email, password, firstName, lastName } = req.body;

  const userToEdit = await User.findOne({ _id: userId }).exec();
  if (!userToEdit)
    return res.status(200).json({ message: `No user with an ID ${userId}` });

  userToEdit.email = email;
  userToEdit.firstName = firstName;
  userToEdit.lastName = lastName;
  userToEdit.password = password;
  userToEdit.avatar = newPath ? newPath : userToEdit.avatar;

  const result = await userToEdit.save();
  return result;
};

const getUser = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID parameter is required" });
  const user = await User.findOne({ _id: id })
    .select("-password -refreshToken")
    .exec();
  if (!user)
    return res.status(200).json({ message: `No user with an ID ${id}` });
  res.status(200).json(user);
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -refreshToken")
      .sort({ createdAt: -1 });
    if (!users || users.length < 1)
      return res.status(200).json({ message: "No users found" });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getRegistrationPage,
  createUser,
  updateUser,
  getUser,
  getAllUsers,
  resetPassword,
};
