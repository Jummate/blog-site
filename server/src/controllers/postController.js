const Post = require("../model/Posts");

const createNewPost = (req, res) => new Post(req, res).createPost();
const getAllPosts = (req, res) => new Post(req, res).getAllPosts();
const getPost = (req, res) => new Post(req, res).getPost();
const editPost = (req, res) => new Post(req, res).editPost();
const deletePost = (req, res) => new Post(req, res).deletePost();

module.exports = { createNewPost, getAllPosts, getPost, editPost, deletePost };