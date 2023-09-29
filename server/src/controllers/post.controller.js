const fsPromises = require("fs").promises;
const path = require("path");
const Post = require("../models/Post");

const createPost = async (req, res) => {
  const { id, title, summary, content, tag, firstName, lastName } = req.body;
  const { originalname, path: filePath } = req.file;
  const ext = path.extname(originalname);
  const newPath = `${filePath}${ext}`;
  try {
    await fsPromises.rename(filePath, newPath);

    const newPost = {
      id,
      tag,
      title,
      summary,
      content,
      author: { fullName: `${firstName} ${lastName}`, avatar: newPath },
      bannerImage: newPath,
    };

    const result = await Post.create(newPost);
    res.status(201).json({ message: "Post created successfully", result });
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID parameter is required" });
  const postToDelete = await Post.findOne({ _id: id }).exec();
  if (!postToDelete)
    return res.status(200).json({ message: `No post with an ID ${id}` });

  const result = await Post.deleteOne({ _id: id });
  const bannerImage = path.parse(postToDelete.bannerImage).base;

  await fsPromises.unlink(
    path.join(__dirname, "..", "..", "public", "uploads", bannerImage)
  );
  res.status(200).json({ message: "Post deleted successfully", result });
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  if (!posts) return res.status(200).json({ message: "No posts found" });
  res.status(200).json(posts);
};

const getPost = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID parameter is required" });
  const post = await Post.findOne({ _id: id }).exec();
  if (!post)
    return res.status(200).json({ message: `No post with an ID ${id}` });
  res.status(200).json(post);
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "ID parameter is required" });

    if (req.file) {
      const { originalname, path: filePath } = req.file;
      const ext = path.extname(originalname);
      const newPath = `${filePath}${ext}`;
      await fsPromises.rename(filePath, newPath);
    }
    const result = req.file
      ? await editPost(req, res, id, newPath)
      : await editPost(req, res, id);

    res.status(200).json({ message: "Post updated successfully", result });
  } catch (err) {
    console.log(err);
  }
};

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
