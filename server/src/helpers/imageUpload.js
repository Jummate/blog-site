const cloudinary = require("../config/cloudinary");

const handleUpload = async (file, config) => {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    ...config,
  });
  return res;
};

module.exports = handleUpload;
