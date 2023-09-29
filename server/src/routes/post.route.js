const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const verifyToken = require("../middleware/verifyToken");
const { uploadMiddleware } = require("../middleware/uploadMiddleware");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/userRoles");

router
  .route("/")
  .post(
    verifyToken,
    verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.EDITOR),
    uploadMiddleware,
    postController.createPost
  )
  .get(postController.getAllPosts);

router
  .route("/:id")
  .get(postController.getPost)
  .put(
    verifyToken,
    verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.EDITOR),
    uploadMiddleware,
    postController.updatePost
  )
  .delete(
    verifyToken,
    verifyRoles(ROLES_LIST.ADMIN),
    postController.deletePost
  );

module.exports = router;