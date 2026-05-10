const Comment = require("../models/Comment");

// ADD COMMENT
exports.addComment = async (req, res) => {
    try {
        const { text, postId } = req.body;

        const comment = await Comment.create({
            text,
            post: postId,
            user: req.user.id
        });

        res.status(201).json({
            message: "Comment added",
            comment
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET COMMENTS OF A POST
exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.json(comments);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};