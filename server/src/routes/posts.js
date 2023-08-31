const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router
  .route("/")
  .post(postController.createNewPost)
  .get(postController.getAllPosts);

router.route("/:id").get(postController.getPost).put(postController.editPost);

module.exports = router;
