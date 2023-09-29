const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register.controller");

router
  .route("/")
  .get(registerController.getRegistrationPage)
  .post(registerController.createUser);

module.exports = router;
