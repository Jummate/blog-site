const User = require("../model/Users");

const handleLogout = (req, res) => new User(req, res).handleLogout();

module.exports = { handleLogout };
