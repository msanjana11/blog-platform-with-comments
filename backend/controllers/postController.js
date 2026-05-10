const Post = require("../models/Post");

// CREATE POST
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const post = await Post.create({
            title,
            content,
            author: req.user.id   // from JWT middleware later
        });

        res.status(201).json({
            message: "Post created",
            post
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET ALL POSTS
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.json(posts);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET SINGLE POST
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("author", "name email");

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(post);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE POST
exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);

        res.json({ message: "Post deleted" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};