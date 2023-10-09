const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const siteInfoSchema = new Schema({
  logo: String,
  siteName: String,
  owner: {
    firstName: String,
    lastName: String,
    avatar: String,
    contact: Schema.Types.Mixed,
    title: [String],
  },
  developer: {
    firstName: String,
    lastName: String,
    avatar: String,
    contact: Schema.Types.Mixed,
    title: [String],
  },
  articlesPerPage: Number,
  heroImage: String,
  introWords: String,
  newsletterCatchphrase: String,
});

module.exports = model("SiteInfo", siteInfoSchema);
