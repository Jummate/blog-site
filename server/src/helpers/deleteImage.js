const cloudinary = require("../config/cloudinary");

const deleteImages = (publicIDArr) => {
  return (
    publicIDArr &&
    publicIDArr.length > 0 &&
    cloudinary.api.delete_resources([...publicIDArr], function (error, result) {
      if (error) throw new Error(error);
      return result;
    })
  );
};

const deleteFolder = (folderName) => {
  return (
    folderName &&
    cloudinary.api.delete_folder(folderName, function (error, result) {
      if (error) throw new Error(error);
      return result;
    })
  );
};

module.exports = { deleteImages, deleteFolder };
