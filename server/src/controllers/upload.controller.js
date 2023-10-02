const fsPromises = require("fs").promises;
const path = require("path");

const uploadContentImage = async (req, res) => {
  try {
    const { originalname, path: filePath } = req.file;
    const ext = path.extname(originalname);
    const newPath = `${filePath}${ext}`;
    await fsPromises.rename(filePath, newPath);
    res
      .status(200)
      .json({ message: "Image uploaded successfully", src: newPath });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { uploadContentImage };
