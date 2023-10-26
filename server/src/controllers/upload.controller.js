const { handleAsync } = require("../helpers/handleAsyncError");
const convertToBase64 = require("../helpers/convertToBase64");
const handleUpload = require("../helpers/imageUpload");
const { folderName } = require("../config/constant");

const uploadContentImage = handleAsync(async (req, res, next) => {
  const { buffer, mimetype } = req.file;
  const { contentID } = req.body;

  const config = {
    folder: `${folderName.CONTENT_IMG}/id${contentID}id`,
  };
  const dataURI = convertToBase64(buffer, mimetype);
  const cldRes = await handleUpload(dataURI, config);

  res
    .status(200)
    .json({ message: "Image uploaded successfully", src: cldRes.secure_url });
});

module.exports = { uploadContentImage };
