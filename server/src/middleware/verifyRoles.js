const verifyRoles = (...allowedRoles) => {
  console.log({ allowedRoles });
  return (req, res, next) => {
    if (!req?.roles) {
      //   console.log(req);
      console.log({ roles: req.roles });
      return res
        .status(401)
        .json({ message: "Not authorized to perform this operation!" });
    }
    const isAuthorized = req.roles
      .map((role) => allowedRoles.includes(role))
      .some((val) => val === true);
    if (!isAuthorized) {
      return res
        .status(401)
        .json({ message: "Not authorized to perform this operation!" });
    }
    next();
  };
};

module.exports = verifyRoles;
