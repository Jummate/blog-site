const Post = require("../model/Posts");

const createNewPost = (req, res) => new Post(req, res).createPost();
const getAllPosts = (req, res) => new Post(req, res).getAllPosts();

module.exports = { createNewPost, getAllPosts };
