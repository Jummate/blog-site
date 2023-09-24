const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const verifyToken = require("../middleware/verifyToken");
const { uploadMiddleware } = require("../middleware/uploadMiddleware");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/userRoles");

router
  .route("/")
  .post(
    verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.EDITOR),
    verifyToken,
    uploadMiddleware,
    postController.createNewPost
  )
  .get(postController.getAllPosts);

router
  .route("/:id")
  .get(postController.getPost)
  .put(
    verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.EDITOR),
    verifyToken,
    uploadMiddleware,
    postController.editPost
  )
  .delete(
    verifyRoles(ROLES_LIST.ADMIN),
    verifyToken,
    postController.deletePost
  );

module.exports = router;
