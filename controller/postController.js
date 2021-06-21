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
    console.log(req.body);
    const newPost = await Post.create(req.body);
    res.status(201).json({
      status: "Success",
    });
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
    const post = await Post.findById(id);
    const updatePost = await Post.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      {
        new: true,
        runValidator: true,
      }
    );
    res.json(updatePost );
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
