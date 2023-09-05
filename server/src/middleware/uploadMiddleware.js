const multer = require("multer");

const upload = multer({
  dest: "./public/uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const uploadMiddleware = upload.single("banner");
module.exports = { uploadMiddleware };
