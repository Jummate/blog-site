const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const errorObj =
    process.env.NODE_ENV === "development"
      ? {
          status: err.status,
          message: err.message,
          stack: err.stack,
        }
      : {
          status: err.status,
          message: err.message,
        };

  res.status(err.statusCode).json(errorObj);
};

module.exports = { errorHandler };
