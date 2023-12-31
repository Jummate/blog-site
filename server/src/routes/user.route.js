const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { uploadMiddleware } = require("../middleware/uploadMiddleware");
const { fileName } = require("../config/constant");

const verifyToken = require("../middleware/verifyToken");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/userRoles");

router
  .route("/")
  .get(userController.getAllUsers)
  .post(uploadMiddleware(fileName.AVATAR), userController.createUser);

router.route("/register").get(userController.getRegistrationPage);
router
  .route("/reset-password/:id")
  .put(
    verifyToken,
    verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.EDITOR),
    userController.resetPassword
  );
router
  .route("/change-role/:id")
  .put(verifyToken, verifyRoles(ROLES_LIST.ADMIN), userController.changeRole);
router
  .route("/:id")
  .get(userController.getUser)
  .put(
    verifyToken,
    verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.EDITOR),
    uploadMiddleware(fileName.AVATAR),
    userController.updateUser
  )
  .delete(
    verifyToken,
    verifyRoles(ROLES_LIST.ADMIN),
    userController.deleteUser
  );

module.exports = router;
