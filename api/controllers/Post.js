import Post from "../models/Post.js";

// ✅ Create Post with optional image upload
export const createPost = async (req, res) => {
  try {
    const userId = req.user._id; // set by verifyUser
    // If multer uploaded a file, it will be available as req.file
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const post = await Post.create({
      ...req.body,
      user: userId,
      image: imagePath, // save file path to DB if available
    });

    res.status(201).json(post);
  } catch (e) {
    console.error("Create post error:", e.message);
    res.status(400).json({ message: e.message });
  }
};

// ✅ List + filters (unchanged)
export const getPosts = async (req, res) => {
  try {
    const { q, branch, year, infoType, sort = "latest" } = req.query;

    const filter = {};
    if (branch) filter.branch = branch;
    if (year) filter.year = Number(year);
    if (infoType) filter.infoType = infoType;
    if (q) filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { content: { $regex: q, $options: "i" } },
    ];

    const sortMap = {
      latest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      popular: { likesCount: -1 },
    };

    // compute likesCount to sort by popularity
    const posts = await Post.aggregate([
      { $match: filter },
      { $addFields: { likesCount: { $size: "$likes" } } },
      { $sort: sortMap[sort] || { createdAt: -1 } },
    ]);

    res.json(posts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ✅ Like / Unlike (unchanged)
export const toggleLike = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const hasLiked = post.likes.some((u) => u.toString() === userId.toString());
    if (hasLiked) {
      post.likes = post.likes.filter((u) => u.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }
    await post.save();
    res.json({ _id: id, likes: post.likes, liked: !hasLiked });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ✅ Comment (unchanged)
export const addComment = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { text } = req.body;
    if (!text?.trim()) return res.status(400).json({ message: "Text required" });

    const post = await Post.findByIdAndUpdate(
      id,
      { $push: { comments: { user: userId, text } } },
      { new: true }
    ).populate("comments.user", "name email");

    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
