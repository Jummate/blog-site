// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   upload_preset: process.env.CLOUDINARY_PRESET_NAME,
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const cloudinary = require("../config/cloudinary");

const handleUpload = async (file, config) => {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    ...config,
  });
  return res;
};

module.exports = handleUpload;
