const express = require("express");
const router = express.Router();
const authController = require("../controllers/logout.controller");
router.route("/").get(authController.handleLogout);

module.exports = router;
