const express = require("express");
const router = express.Router();
const authController = require("../controllers/logOutController");
router.route("/").get(authController.handleLogout);

module.exports = router;
