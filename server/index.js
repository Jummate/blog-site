const express = require("express");
const cors = require("cors");
const corsOptions = require("./src/config/corsOptions");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const credentials = require("./src/middleware/credentials");
const connectDB = require("./src/config/dbConn");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3500;

//connect to DB
connectDB();

//middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(
  "/public/uploads/banners",
  express.static(path.join(__dirname, "/public/uploads/banners"))
);
app.use(
  "/public/uploads/content",
  express.static(path.join(__dirname, "/public/uploads/content"))
);
app.use(cookieParser());

// routes
app.use("/posts", require("./src/routes/post.route"));
app.use("/users", require("./src/routes/user.route"));
app.use("/auth", require("./src/routes/auth.route"));
app.use("/refresh", require("./src/routes/refreshtoken.route"));
app.use("/logout", require("./src/routes/logout.route"));
app.use("/upload", require("./src/routes/upload.route"));

//this ensures that app will only listen if DB connection is successful
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
