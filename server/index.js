const express = require("express");
const cors = require("cors");
const corsOptions = require("./src/config/corsOptions");
const { uploadMiddleware } = require("./src/middleware/uploadMiddleware");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3500;

//middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use("/posts", express.static(path.join(__dirname, "/public/uploads")));
app.use(express.json());

// routes
app.use("/posts", uploadMiddleware, require("./src/routes/posts"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
