const Post = require("../models/postModel");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      return res.status(404).json("NO post found");
    }
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {

console.log(req.userId);

    const post = req.body;
    const newPostMessage = await new Post({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (err) {
    console.log(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = req.body;

    const updatePost = await Post.findByIdAndUpdate(id, post, {
      new: true,
      runValidator: true,
    });
    if (!updatePost) {
      return res.status(404).send("No Post found with that id");
    }

    res.status(200).json(updatePost);
  } catch (err) {
    console.log(err);
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.userId) {
      return res.json({ message: "Unauthanticated" });
    }

    const post = await Post.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      // like the post
      post.likes.push(req.userId);
    } else {
      // dislike the post
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatePost = await Post.findByIdAndUpdate(id, post, {
      new: true,
      runValidator: true,
    });
    res.json(updatePost);
  } catch (err) {
    console.log(err);
  }
};
exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndRemove(id);
    res.json({ message: "Post Deleted Successfully" });
  } catch (err) {
    console.log(err);
  }
};
