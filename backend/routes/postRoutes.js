
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

// CREATE POST
router.post("/create", authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;
        const author = req.user?.id;

        if (!author) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const newPost = new Post({
            title,
            content,
            author
        });

        await newPost.save();

        res.status(201).json({
            message: "Post created",
            newPost
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// GET ALL POSTS
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "name email");
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedPost);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;