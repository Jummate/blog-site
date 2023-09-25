const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader.split(" ")[1];

  if (!authHeader || !token) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.email = decoded.email;
    req.firstName = decoded.firstName;
    req.lastName = decoded.lastName;
    req.roles = decoded.roles;
    next();
  });
};

module.exports = verifyToken;
