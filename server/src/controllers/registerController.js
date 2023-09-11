const User = require("../model/Users");

const getRegistrationPage = (req, res) =>
  new User(req, res).getRegistrationPage();

const createUser = (req, res) => new User(req, res).createUser();

module.exports = { getRegistrationPage, createUser };
