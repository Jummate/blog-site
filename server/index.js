const express = require("express");
const cors = require("cors");
const corsOptions = require("./src/config/corsOptions");
const { uploadMiddleware } = require("./src/middleware/uploadMiddleware");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const credentials = require("./src/middleware/credentials");

const PORT = process.env.PORT || 3500;

//middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "/public/uploads"))
);
app.use(cookieParser());

// routes
app.use("/posts", require("./src/routes/posts"));
app.use("/register", require("./src/routes/register"));
app.use("/auth", require("./src/routes/auth"));
app.use("/refresh", require("./src/routes/refresh"));
app.use("/logout", require("./src/routes/logout"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
