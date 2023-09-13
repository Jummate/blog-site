const fsPromises = require("fs").promises;
const path = require("path");
const users = require("../db/users.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
    const { email, password, firstName, lastName } = this.req.body;

    if (!email || !password) {
      return this.res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    const duplicate = this.users.find((user) => user.email === email);
    if (duplicate)
      return this.res.status(409).json({ message: "Email already taken" });

    try {
      const hashedPwd = await bcrypt.hash(password, 10);
      const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPwd,
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
    try {
      this.res.sendFile(
        path.join(__dirname, "..", "..", "public", "register.html")
      );
    } catch (err) {
      console.log(err);
    }
  }

  async handleLogin() {
    const { email, password } = this.req.body;

    if (!email || !password) {
      return this.res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    const potentialUser = this.users.find((user) => user.email === email);
    if (!potentialUser)
      return this.res.status(401).json({ message: "Records not found" });

    const matchedPwd = await bcrypt.compare(password, potentialUser.password);
    if (matchedPwd) {
      //use expiry time of 5 or 15mins for access token in production
      const accessToken = jwt.sign(
        {
          email: potentialUser.email,
          firstName: potentialUser.firstName,
          lastName: potentialUser.lastName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60s" }
      );
      const refreshToken = jwt.sign(
        {
          email: potentialUser.email,
          firstName: potentialUser.firstName,
          lastName: potentialUser.lastName,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      const otherUsers = this.users.filter(
        (user) => user.email !== potentialUser.email
      );
      const currentUser = { ...potentialUser, refreshToken };

      this.setUser([...otherUsers, currentUser]);

      await fsPromises.writeFile(
        path.join(__dirname, "..", "db", "users.json"),
        JSON.stringify(this.users)
      );

      //use longer days for refresh token in production
      //add "secure" and set to true i.e. secure=true
      //add sameSite and set to strict i.e. sameSite='strict'
      this.res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      this.res
        .status(200)
        .json({ accessToken, message: "Logged in successfully!" });
    }
  }

  async handleRefreshToken() {
    const { cookies } = this.req;

    if (!cookies?.jwt) return this.res.sendStatus(401);

    const refreshToken = cookies.jwt;
    const foundUser = this.users.find(
      (user) => user.refreshToken === refreshToken
    );
    if (!foundUser) return this.res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || decoded.email !== foundUser.email) {
          return this.res.sendStatus(403);
        }
        const accessToken = jwt.sign(
          {
            email: foundUser.email,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "60s" }
        );
        this.res.json({ accessToken });
      }
    );
  }

  async handleLogout() {
    const { cookies } = this.req;

    if (!cookies?.jwt) return this.res.sendStatus(204);

    const refreshToken = cookies.jwt;
    const foundUser = this.users.find(
      (user) => user.refreshToken === refreshToken
    );
    if (!foundUser) {
      this.res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return this.res.sendStatus(204);
    }

    const otherUsers = this.users.filter(
      (user) => user.refreshToken !== foundUser.refreshToken
    );
    const currentUser = { ...foundUser, refreshToken: "" };

    this.setUser([...otherUsers, currentUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "db", "users.json"),
      JSON.stringify(this.users)
    );

    // !!!!! Add secure:true in production to make it serve only on https protocol
    this.res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    //OK but no content to send back
    return this.res.sendStatus(204);
  }
}

module.exports = User;
