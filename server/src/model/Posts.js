const fsPromises = require("fs").promises;
const path = require("path");
const posts = require("../db/posts.json");
const users = require("../db/users.json");

class Post {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.posts = [...posts];
  }

  setPosts(newPosts) {
    this.posts = newPosts;
  }

  updatePost(id, newPath = undefined) {
    const { title, summary, content, tag } = this.req.body;

    const postToEdit = this.posts.find((item) => item.id === id);

    const editedPost = {
      ...postToEdit,
      title,
      tag,
      summary,
      content,
      bannerImage: newPath ? newPath : postToEdit.bannerImage,
    };
    const filteredPosts = this.posts.filter((item) => item.id !== id);

    this.setPosts([...filteredPosts, editedPost]);
  }

  async createPost() {
    const { id, title, summary, content, tag, firstName, lastName } =
      this.req.body;
    const { originalname, path: filePath } = this.req.file;
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
        author: `${firstName} ${lastName}`,
        createdAt: "April 20, 2023",
        bannerImage: newPath,
        authorImage: newPath,
      };

      this.setPosts([...this.posts, newPost]);

      await fsPromises.writeFile(
        path.join(__dirname, "..", "db", "posts.json"),
        JSON.stringify(this.posts)
      );

      this.res.status(201).json({ message: "Post created successfully" });
    } catch (err) {
      console.log(err);
    }
  }

  async editPost() {
    try {
      const { id } = this.req.params;
      if (this.req.file) {
        const { originalname, path: filePath } = this.req.file;
        const ext = path.extname(originalname);
        const newPath = `${filePath}${ext}`;
        await fsPromises.rename(filePath, newPath);
      }
      this.req.file ? this.updatePost(id, newPath) : this.updatePost(id);
      await fsPromises.writeFile(
        path.join(__dirname, "..", "db", "posts.json"),
        JSON.stringify(this.posts)
      );
      this.res.status(200).json({ message: "Post updated successfully" });
    } catch (err) {
      console.log(err);
    }
  }

  async deletePost() {
    const { id } = this.req.params;
    const postToDelete = this.posts.find((item) => item.id === id);
    const bannerImage = path.parse(postToDelete.bannerImage).base;
    const filteredPosts = this.posts.filter((item) => item.id !== id);
    this.setPosts(filteredPosts);
    try {
      await fsPromises.writeFile(
        path.join(__dirname, "..", "db", "posts.json"),
        JSON.stringify(this.posts)
      );
      await fsPromises.unlink(
        path.join(__dirname, "..", "..", "public", "uploads", bannerImage)
      );
      this.res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
      console.log(err);
    }
  }

  getAllPosts() {
    this.res.status(200).json(this.posts);
  }

  getPost() {
    const { id } = this.req.params;
    const post = this.posts.filter((item) => item.id === id);
    this.res.status(200).json(post);
  }
}

module.exports = Post;
