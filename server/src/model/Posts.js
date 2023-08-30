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
    this.posts.push(newPost);
  }

  async createPost() {
    const { id, title, summary, content } = this.req.body;
    const { originalname, path: filePath } = this.req.file;
    const ext = originalname.split(".").slice(-1).toString();
    const newPath = `${filePath}.${ext}`;
    try {
      await fsPromises.rename(filePath, newPath);

      const newPost = {
        id,
        tag: "Science",
        title,
        summary,
        content,
        readTime: "4min",
        author: "Olawale Jumat",
        createdAt: "April 20, 2023",
        bannerImage: newPath,
        authorImage: newPath,
      };

      this.setPosts(newPost);

      await fsPromises.writeFile(
        path.join(__dirname, "..", "db", "posts.json"),
        JSON.stringify(this.posts)
      );

      this.res.status(201).json({ message: "Post created successfully" });
    } catch (err) {
      console.log(err);
    }
  }

  getAllPosts() {
    this.res.status(200).json(this.posts);
  }
}

module.exports = Post;
