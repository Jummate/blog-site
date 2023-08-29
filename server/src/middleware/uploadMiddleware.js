const multer = require("multer");

const upload = multer({ dest: "./public/uploads/" });

const uploadMiddleware = upload.single("banner");
module.exports = { uploadMiddleware };
