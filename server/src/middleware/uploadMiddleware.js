const multer = require("multer");

const upload = multer({
  dest: "./public/uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
}).single("banner");

const uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ message: err });
    next();
  });
};
module.exports = { uploadMiddleware };
