const path = require("path");
const userRoles = require("../config/userRoles");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const convertToBase64 = require("../helpers/convertToBase64");
const handleUpload = require("../helpers/imageUpload");
const { handleAsync } = require("../helpers/handleAsyncError");
const CustomError = require("../utils/error.custom");
const { folderName } = require("../config/constant");

const getRegistrationPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "register.html"));
};

const resetPassword = handleAsync(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.params;

  if (!oldPassword || !newPassword)
    return next(new CustomError("Old and new passwords are required.", 400));

  if (!id) return next(new CustomError("ID parameter is required", 400));

  const foundUser = await User.findOne({ _id: id }).exec();
  if (!foundUser) return next(new CustomError("Record not found", 400));

  const matchedPwd = await bcrypt.compare(oldPassword, foundUser.password);

  if (!matchedPwd) return next(new CustomError("Incorrect old password", 400));

  const hashedNewPwd = await bcrypt.hash(newPassword, 10);
  foundUser.password = hashedNewPwd;
  await foundUser.save();

  res.status(200).json({ message: "Password successfully changed" });
});

const changeRole = handleAsync(async (req, res, next) => {
  const { roles } = req.body;
  const { id } = req.params;

  if (!id) return next(new CustomError("ID parameter is required", 400));

  const foundUser = await User.findOne({ _id: id }).exec();
  if (!foundUser) return next(new CustomError("Record not found", 400));

  foundUser.roles = [...roles];
  await foundUser.save();

  res.status(200).json({ message: "Roles successfully updated" });
});

const createUser = handleAsync(async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  const { buffer, mimetype } = req.file;

  if (!email || !password) {
    return next(new CustomError("Email and password are required.", 400));
  }
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) return next(new CustomError("Email already taken", 409));

  const config = {
    folder: folderName.AVATAR,
  };
  const dataURI = convertToBase64(buffer, mimetype);
  const cldRes = await handleUpload(dataURI, config);
  const hashedPwd = await bcrypt.hash(password, 10);
  const newUser = {
    firstName,
    lastName,
    email,
    roles: [userRoles.ADMIN],
    password: hashedPwd,
    avatar: cldRes.secure_url,
  };

  const result = await User.create(newUser);

  res.status(201).json({
    message: `New user (${firstName} ${lastName}) created successfully`,
  });
});

const updateUser = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new CustomError("ID parameter is required", 400));

  let result;

  if (req.file) {
    const config = {
      folder: folderName.AVATAR,
    };
    const { buffer, mimetype } = req.file;
    const dataURI = convertToBase64(buffer, mimetype);
    const cldRes = await handleUpload(dataURI, config);
    result = await editUser(req, res, id, cldRes.secure_url);
  } else {
    result = await editUser(req, res, id);
  }

  res.status(200).json({ message: "User updated successfully", result });
});

const editUser = async (req, res, userId, newPath = undefined) => {
  const { email, firstName, lastName } = req.body;

  const userToEdit = await User.findOne({ _id: userId }).exec();
  if (!userToEdit)
    return res
      .status(200)
      .json({ message: `No user with an ID ${userId}`, data: null });

  userToEdit.email = email;
  userToEdit.firstName = firstName;
  userToEdit.lastName = lastName;
  userToEdit.avatar = newPath ? newPath : userToEdit.avatar;

  const result = await userToEdit.save();
  return result;
};

const getUser = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new CustomError("ID parameter is required", 400));
  const user = await User.findOne({ _id: id })
    .select("-password -refreshToken")
    .exec();
  if (!user)
    return res
      .status(200)
      .json({ message: `No user with an ID ${id}`, data: null });
  res.status(200).json(user);
});

const getAllUsers = handleAsync(async (req, res, next) => {
  const users = await User.find()
    .select("-password -refreshToken")
    .sort({ createdAt: -1 });
  if (!users || users.length < 1)
    return res.status(200).json({ message: "No users found", data: [] });
  res.status(200).json(users);
});

const deleteUser = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new CustomError("ID parameter is required", 400));
  const userToDelete = await User.findOne({ _id: id }).exec();
  if (!userToDelete)
    return res
      .status(200)
      .json({ message: `No user with an ID ${id}`, data: null });

  const result = await User.deleteOne({ _id: id });

  res.status(200).json({ message: "User deleted successfully", result });
});

module.exports = {
  getRegistrationPage,
  createUser,
  updateUser,
  getUser,
  getAllUsers,
  deleteUser,
  resetPassword,
  changeRole,
};
