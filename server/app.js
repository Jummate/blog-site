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

// routes
app.use("/posts", require("./src/routes/post.route"));
app.use("/users", require("./src/routes/user.route"));
app.use("/auth", require("./src/routes/auth.route"));
app.use("/refresh", require("./src/routes/refreshtoken.route"));
app.use("/logout", require("./src/routes/logout.route"));
app.use("/upload", require("./src/routes/upload.route"));

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
