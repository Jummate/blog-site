const express = require("express");
const cors = require("cors");
const corsOptions = require("./src/config/corsOptions");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const credentials = require("./src/middleware/credentials");
const CustomError = require("./src/utils/error.custom");
const { errorHandler } = require("./src/utils/error");
require("dotenv").config();

//middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use("/users", express.static(path.join(__dirname, "/public")));
// app.use(
//   "/public/uploads/banners",
//   express.static(path.join(__dirname, "/public/uploads/banners"))
// );
// app.use(
//   "/public/uploads/content",
//   express.static(path.join(__dirname, "/public/uploads/content"))
// );
app.use(cookieParser());

// app.use((req, res, next) => {
//   console.log(req.url);
//   next();
// });

// routes
app.use("/api/v1/posts", require("./src/api/v1/routes/post.route"));
app.use("/api/v1/users", require("./src/api/v1/routes/user.route"));
app.use("/api/v1/auth", require("./src/api/v1/routes/auth.route"));
app.use("/api/v1/refresh", require("./src/api/v1/routes/refreshtoken.route"));
app.use("/api/v1/logout", require("./src/api/v1/routes/logout.route"));
app.use("/api/v1/upload", require("./src/api/v1/routes/upload.route"));

app.all("*", (req, res, next) => {
  next(
    new CustomError(
      `Can't find ${req.originalUrl} with ${req.method} method on the server`,
      404
    )
  );
});

app.use(errorHandler);

module.exports = app;
