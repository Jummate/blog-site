const cloudinary = require("cloudinary");

const deleteImage = (publicID) => {
  return cloudinary.v2.uploader.destroy(publicID, function (error, result) {
    if (error) throw new Error(error);
    return result;
  });
};

module.exports = deleteImage;
