const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    creator: {
      type: String,
    },
    name: {
      type: String,
    },
    tags: [String],
    selectedFile: String,
    likes: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("Post", postSchema);
