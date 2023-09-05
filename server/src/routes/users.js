const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
router
  .route("/")
  .get(registerController.getRegistrationPage)
  .post(registerController.createUser);

module.exports = router;
