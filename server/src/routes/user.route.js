const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { uploadFromFrontend } = require("../middleware/uploadFromFrontend");

router
  .route("/")
  .get(uploadFromFrontend, userController.getAllUsers)
  .post(uploadFromFrontend, userController.createUser);

router.route("/register").get(userController.getRegistrationPage);
router.route("/reset-password/:id").put(userController.resetPassword);
router
  .route("/:id")
  .get(userController.getUser)
  .put(uploadFromFrontend, userController.updateUser);

module.exports = router;
