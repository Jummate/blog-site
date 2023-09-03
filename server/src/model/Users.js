const fsPromises = require("fs").promises;
const path = require("path");
const users = require("../db/users.json");
const bcrypt = require("bcrypt");

class User {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.users = [...users];
  }

  setUser(newUsers) {
    this.users = newUsers;
  }

  async createUser() {
    const { email, password } = this.req.body;

    if (!email || !password) {
      return this.res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    const duplicate = this.users.find((user) => user.email === email);
    if (duplicate)
      return this.res.status(409).json({ message: "Records already exist" });

    try {
      const hashedPwd = await bcrypt.hash(password, 10);
      const newUser = {
        email,
        hashedPwd,
      };
      this.setUser([...this.users, newUser]);

      await fsPromises.writeFile(
        path.join(__dirname, "..", "db", "users.json"),
        JSON.stringify(this.users)
      );

      this.res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      console.log(err);
    }
  }

  getRegistrationPage() {
    // const { usera, title, summary, content, tag } = this.req.body;
    // const { originalname, path: filePath } = this.req.file;
    // const ext = originalname.split(".").slice(-1).toString();
    // const newPath = `${filePath}.${ext}`;
    try {
      //   await fsPromises.rename(filePath, newPath);

      //   const newPost = {
      //     id,
      //     tag,
      //     title,
      //     summary,
      //     content,
      //     readTime: "4min",
      //     author: "Olawale Jumat",
      //     createdAt: "April 20, 2023",
      //     bannerImage: newPath,
      //     authorImage: newPath,
      //   };

      //   this.setPosts([...this.posts, newPost]);

      //   await fsPromises.writeFile(
      //     path.join(__dirname, "..", "db", "posts.json"),
      //     JSON.stringify(this.posts)
      //   );

      this.res.sendFile(
        path.join(__dirname, "..", "..", "public", "register.html")
      );

      //   this.res.send(
      //     "<h1 style='color:#fff; background-color:red'>You are Welcome to register page</h1>"
      //   );

      //   this.res.status(201).json({ message: "Post created successfully" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = User;
