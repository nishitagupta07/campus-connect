import express from "express";
import User from "../models/user.js"; // adjust path if needed
import bcrypt from "bcryptjs";
import multer from "multer";   //new addition by Mehul
import jwt from "jsonwebtoken";

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const fileFilter = (req, file, cb) => {
  if (["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg and .jpeg formats allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

const router = express.Router();


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
// ✅ Test route (always return JSON)
router.get("/test", (req, res) => {
  res.json({ message: "Backend API working fine 🚀" });
});

// Signup route
router.post("/signup", upload.single("photo"), async (req, res) => {
  try {
    console.log("req.body:", req.body); // For debugging
    console.log("req.file:", req.file); // For debugging

    const { username, email, password, branch, passoutYear, linkedIn } = req.body;

    if (!username || !email || !password || !branch || !passoutYear || !linkedIn) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);  // No need anymore

    const newUser = new User({
      name: username,           // frontend "username" -> backend "name"
      email,
      password,
      branch,
      passoutYear,
      linkedIn,
      photo: req.file ? req.file.filename : null
    });

    await newUser.save();
    const token = generateToken(newUser._id)

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
      token
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
//New updated version by Mehul

// ✅ Signin route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id)
    console.log("JWT_SECRET in login:", process.env.JWT_SECRET);
    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
export default router;