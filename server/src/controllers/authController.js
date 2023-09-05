const User = require("../model/Users");

const handleLogin = (req, res) => new User(req, res).handleLogin();

module.exports = { handleLogin };
