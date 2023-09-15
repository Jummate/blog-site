const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const verifyToken = require("../middleware/verifyToken");
const { uploadMiddleware } = require("../middleware/uploadMiddleware");

router
  .route("/")
  .post(verifyToken, uploadMiddleware, postController.createNewPost)
  .get(postController.getAllPosts);

router
  .route("/:id")
  .get(postController.getPost)
  .put(verifyToken, uploadMiddleware, postController.editPost)
  .delete(verifyToken, postController.deletePost);

module.exports = router;
