import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import postRoutes from "./routes/post.js";
import dotenv from 'dotenv';
import testAuthRoutes from "./routes/testAuth.js";
import connectDB from "./config/db.js";

const app = express();
dotenv.config({
    path: "../.env"
})
// connect to MongoDB
connectDB();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/posts", postRoutes);
app.use("/api/test", testAuthRoutes);
app.use("/uploads", express.static("uploads"));
export default app;