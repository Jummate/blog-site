const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
router.route("/").post(authController.handleLogin);

module.exports = router;
