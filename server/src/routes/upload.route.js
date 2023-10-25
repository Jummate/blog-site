const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload.controller");
const { uploadFiles } = require("../middleware/uploadFiles");

router.route("/").post(uploadFiles, uploadController.uploadContentImage);
module.exports = router;
