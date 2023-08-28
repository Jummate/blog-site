const express = require("express");

const app = express();

app.get(
  "/",
  (req, res, next) => {
    res.send("<h1 style='color:red'>Hello World<h1>");
    next();
  },
  (req, res) => {
    console.log("You");
  }
);

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
