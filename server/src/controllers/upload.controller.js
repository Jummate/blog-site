// const fsPromises = require("fs").promises;
// const path = require("path");
const convertToBase64 = require("../helpers/convertToBase64");
const handleUpload = require("../helpers/imageUpload");

const uploadContentImage = async (req, res) => {
  const { buffer, mimetype } = req.file;

  try {
    const config = {
      folder: "content",
    };
    const dataURI = convertToBase64(buffer, mimetype);
    const cldRes = await handleUpload(dataURI, config);

    // const { originalname, path: filePath } = req.file;
    // const ext = path.extname(originalname);
    // const newPath = `${filePath}${ext}`;
    // await fsPromises.rename(filePath, newPath);
    res
      .status(200)
      .json({ message: "Image uploaded successfully", src: cldRes.secure_url });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { uploadContentImage };
