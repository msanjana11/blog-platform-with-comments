const express = require("express");
const router = express.Router();

const Comment = require("../models/Comment");
const authMiddleware = require("../middleware/authMiddleware");

// ➕ ADD COMMENT (POST)
router.post("/add", authMiddleware, async (req, res) => {
    try {
        const { text, postId } = req.body;

        if (!text || !postId) {
            return res.status(400).json({ message: "text and postId required" });
        }

        const comment = new Comment({
            text,
            post: postId,
            user: req.user.id
        });

        await comment.save();

        res.status(201).json({
            message: "Comment added",
            comment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 📥 GET COMMENTS FOR A POST
router.get("/post/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.json(comments);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;