const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router
  .route("/")
  .post(postController.createNewPost)
  .get(postController.getAllPosts);

module.exports = router;
