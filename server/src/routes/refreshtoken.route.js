const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/refreshtoken.controller");
router.route("/").get(refreshTokenController.handleRefreshToken);

module.exports = router;
