const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const limits = { fileSize: 3 * 1024 * 1024 };

const checkFileType = (file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|svg|webp/i;

  const validExt = fileTypes.test(path.extname(file.originalname));
  const validMimeType = fileTypes.test(file.mimetype);
  if (validExt && validMimeType) {
    return cb(null, true);
  }
  cb("Error: Only images are allowed!");
};

const fileFilter = (req, file, cb) => {
  checkFileType(file, cb);
};

const upload = multer({ storage, limits, fileFilter }).single("avatar");

const uploadFromFrontend = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError)
      return res.status(400).json({ message: err.message });
    if (err) return res.status(400).json({ message: err });
    next();
  });
};

module.exports = { uploadFromFrontend };
