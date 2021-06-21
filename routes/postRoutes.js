const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");


router.route('/').get(postController.getPosts).post(postController.createPost)

router.route('/:id').patch(postController.updatePost).delete(postController.deletePost)
router.route('/:id/likePost').patch(postController.likePost)

module.exports = router;
