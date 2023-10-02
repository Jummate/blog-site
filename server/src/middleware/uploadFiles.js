const multer = require("multer");

const upload = multer({
  dest: "./public/uploads/content/",
  limits: { fileSize: 3 * 1024 * 1024 },
}).single("files");

const uploadFiles = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (err) return res.status(400).json({ message: err });
    next();
  });
};
module.exports = { uploadFiles };
