const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const app = express();

// middleware
//app.use(cors());
app.use(cors({
    origin: ["http://localhost:3000", "https://your-vercel-url.vercel.app"]
}));

app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// test route
app.get("/", (req, res) => {
    res.send("Blog API is running 🚀");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
})
.catch((err) => {
    console.log("MongoDB connection error:", err);
});