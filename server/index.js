const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");
const connectDB = require("./src/config/dbConn");

const PORT = process.env.PORT || 3500;

//connect to DB
connectDB();

let server;

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION, Server is shutting down...");
  process.exit(1);
});

//this ensures that app will only listen if DB connection is successful
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  server = app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
  );
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLED REJECTION, Server is shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
