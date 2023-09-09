const whitelist = require("../config/whitelist");

const credentials = (req, res, next) => {
  const { origin } = req.headers;
  if (whitelist.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
