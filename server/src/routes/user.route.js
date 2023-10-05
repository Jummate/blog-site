const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { uploadFromFrontend } = require("../middleware/uploadFromFrontend");

router.route("/").post(uploadFromFrontend, userController.createUser);

router.route("/register").get(userController.getRegistrationPage);
router.route("/:id").put(uploadFromFrontend, userController.updateUser);

module.exports = router;
