const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    tag: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    author: { fullName: String, avatar: String },
    bannerImage: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
