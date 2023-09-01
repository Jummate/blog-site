const fsPromises = require("fs").promises;
const path = require("path");
const posts = require("../db/posts.json");

class Post {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.posts = [...posts];
  }

  setPosts(newPost) {
    this.posts = [...this.posts, ...newPost];
  }

  updatePost(id, bannerImage) {
    const { title, summary, content, tag } = this.req.body;

    const postToEdit = this.posts.find((item) => item.id === id);

    const editedPost = {
      ...postToEdit,
      title,
      tag,
      summary,
      content,
      bannerImage,
    };
    const filteredPosts = this.posts.filter((item) => item.id !== id);

    this.setPosts([...filteredPosts, editedPost]);
  }

  async createPost() {
    const { id, title, summary, content, tag } = this.req.body;
    const { originalname, path: filePath } = this.req.file;
    const ext = originalname.split(".").slice(-1).toString();
    const newPath = `${filePath}.${ext}`;
    try {
      await fsPromises.rename(filePath, newPath);

      const newPost = {
        id,
        tag,
        title,
        summary,
        content,
        readTime: "4min",
        author: "Olawale Jumat",
        createdAt: "April 20, 2023",
        bannerImage: newPath,
        authorImage: newPath,
      };

      this.setPosts([newPost]);

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
    const { id } = this.req.params;
    const { originalname, path: filePath } = this.req.file;
    const ext = originalname.split(".").slice(-1).toString();
    const newPath = `${filePath}.${ext}`;

    try {
      await fsPromises.rename(filePath, newPath);
      this.updatePost(id, newPath);
      await fsPromises.writeFile(
        path.join(__dirname, "..", "db", "posts.json"),
        JSON.stringify(this.posts)
      );
      this.res.status(200).json({ message: "Post updated successfully" });
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
