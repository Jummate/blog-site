const express = require("express");
const cors = require("cors");
const corsOptions = require("./src/config/corsOptions");
const { uploadMiddleware } = require("./src/middleware/uploadMiddleware");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3500;

//middleware
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "/public/uploads"))
);

// routes
app.use("/posts", uploadMiddleware, require("./src/routes/posts"));
app.use("/register", require("./src/routes/users"));
app.use("/auth", require("./src/routes/auth"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
