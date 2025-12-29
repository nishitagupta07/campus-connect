import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import postRoutes from "./routes/post.js";
import profile from "./routes/profile.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

connectDB();

app.use("/api/posts", postRoutes);
app.use("/api/profiles", profile);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend running ✅" });
});

const PORT = 8080;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
