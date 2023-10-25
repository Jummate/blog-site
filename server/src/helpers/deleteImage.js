const cloudinary = require("cloudinary").v2;

cloudinary.config({
  upload_preset: process.env.CLOUDINARY_PRESET_NAME,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteImages = (publicIDArr) => {
  console.log("deleting image...");
  return cloudinary.api.delete_resources(
    [...publicIDArr],
    function (error, result) {
      if (error) throw new Error(error);
      return result;
    }
  );
};

const deleteFolder = (folderName) => {
  console.log("deleting folder....");
  return cloudinary.api.delete_folder(folderName, function (error, result) {
    if (error) throw new Error(error);
    return result;
  });
};

module.exports = { deleteImages, deleteFolder };
