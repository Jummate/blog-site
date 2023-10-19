const multer = require("multer");

const storage = multer.memoryStorage();
const limits = { fileSize: 3 * 1024 * 1024 };

const upload = multer({
  storage,
  limits,
}).single("files");

const uploadFiles = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError)
      return res.status(400).json({ message: err.message });
    if (err) return res.status(400).json({ message: err });
    next();
  });
};
module.exports = { uploadFiles };
