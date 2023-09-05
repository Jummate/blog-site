const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const verifyToken = require("../middleware/verifyToken");

router
  .route("/")
  .post(postController.createNewPost)
  .get(postController.getAllPosts);

router
  .route("/:id")
  .get(postController.getPost)
  .put(verifyToken, postController.editPost)
  .delete(verifyToken, postController.deletePost);

module.exports = router;
