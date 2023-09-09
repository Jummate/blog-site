const User = require("../model/Users");

const handleRefreshToken = (req, res) =>
  new User(req, res).handleRefreshToken();

module.exports = { handleRefreshToken };
