const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const verifyToken = require("../middleware/verifyToken");
const { uploadMiddleware } = require("../middleware/uploadMiddleware");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/userRoles");
const { fileName } = require("../config/constant");

router
  .route("/")
  .post(
    verifyToken,
    verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.EDITOR),
    uploadMiddleware(fileName.BANNER),
    postController.createPost
  )
  .get(postController.getAllPosts);

router
  .route("/:id")
  .get(postController.getPost)
  .put(
    verifyToken,
    verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.EDITOR),
    uploadMiddleware(fileName.BANNER),
    postController.updatePost
  )
  .delete(
    verifyToken,
    verifyRoles(ROLES_LIST.ADMIN),
    postController.deletePost
  );

module.exports = router;
