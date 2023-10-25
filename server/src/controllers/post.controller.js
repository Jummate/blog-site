const path = require("path");
const Post = require("../models/Post");
const convertToBase64 = require("../helpers/convertToBase64");
const handleUpload = require("../helpers/imageUpload");
const { deleteImages, deleteFolder } = require("../helpers/deleteImage");
const { handleAsync } = require("../helpers/handleAsyncError");
const CustomError = require("../utils/error.custom");

const extractURL = require("../helpers/extractURL");
const cleanURL = require("../helpers/cleanURL");
const buildPublicID = require("../helpers/buildPublicID");

const createPost = handleAsync(async (req, res, next) => {
  const { title, summary, content, tag, firstName, lastName, avatar } =
    req.body;
  const { buffer, mimetype } = req.file;

  const config = {
    folder: "banner",
  };
  let dataURI;
  let cldRes;

  try {
    dataURI = convertToBase64(buffer, mimetype);
    cldRes = await handleUpload(dataURI, config);

    const newPost = {
      tag,
      title,
      summary,
      content,
      author: {
        fullName: `${firstName} ${lastName}`,
        avatar,
      },
      bannerImage: cldRes.secure_url,
    };

    const result = await Post.create(newPost);
    res.status(201).json({ message: "Post created successfully", result });
  } catch (err) {
    //delete images already uploaded
    const bannerPubID = buildPublicID([cldRes?.secure_url]);
    const cleanedURL = cleanURL(extractURL(content));
    const contentPubID = buildPublicID(cleanedURL, "content");
    await deleteImages([...bannerPubID, ...contentPubID]);
    next(err);
  }
});

const deletePost = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new CustomError("ID parameter is required", 400));
  const postToDelete = await Post.findOne({ _id: id }).exec();
  if (!postToDelete)
    return res.status(200).json({ message: `No post with an ID ${id}` });

  const bannerPubID = buildPublicID([postToDelete.bannerImage]);
  const cleanedURL = cleanURL(extractURL(postToDelete.content));

  const contentPubID = buildPublicID(cleanedURL, "content");
  const delImage = await deleteImages([...bannerPubID, ...contentPubID]);
  // const delFolder = await deleteFolder(
  //   buildPublicID(cleanedURL)[0].split("/")[0]
  // );

  const result = await Post.deleteOne({ _id: id });

  res.status(200).json({ message: "Post deleted successfully", result });
});

const getAllPosts = handleAsync(async (req, res, next) => {
  const posts = await Post.find().sort({ createdAt: -1 });

  if (!posts || posts.length < 1)
    return res.status(200).json({ message: "No posts found" });
  res.status(200).json(posts);
});

const getPost = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new CustomError("ID parameter is required", 400));
  const post = await Post.findOne({ _id: id }).exec();
  if (!post)
    return res.status(200).json({ message: `No post with an ID ${id}` });
  res.status(200).json(post);
});

const updatePost = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new CustomError("ID parameter is required", 400));

  let result;

  if (req.file) {
    const config = {
      folder: "banner",
    };
    const { buffer, mimetype } = req.file;
    const dataURI = convertToBase64(buffer, mimetype);
    let cldRes;
    try {
      cldRes = await handleUpload(dataURI, config);
      result = await editPost(req, res, id, cldRes.secure_url);
    } catch (err) {
      //delete images already uploaded
      const bannerPubID = buildPublicID([cldRes?.secure_url]);
      await deleteImages([...bannerPubID]);
      next(err);
    }
  } else {
    result = await editPost(req, res, id);
  }

  res.status(200).json({ message: "Post updated successfully", result });
});

const editPost = async (req, res, postId, newPath = undefined) => {
  const { title, summary, content, tag } = req.body;

  const postToEdit = await Post.findOne({ _id: postId }).exec();
  if (!postToEdit)
    return res.status(200).json({ message: `No post with an ID ${postId}` });

  postToEdit.title = title;
  postToEdit.summary = summary;
  postToEdit.tag = tag;
  postToEdit.content = content;
  postToEdit.bannerImage = newPath ? newPath : postToEdit.bannerImage;

  const result = await postToEdit.save();
  return result;
};

module.exports = { createPost, deletePost, getPost, getAllPosts, updatePost };
