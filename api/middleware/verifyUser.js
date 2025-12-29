import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

export default async function verifyUser(req, res, next) {
  try {
    // read authorization header (case-insensitive) or cookie
    const authHeader = req.headers.authorization || req.get("authorization");
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies?.token;


    console.log("JWT_SECRET in verifyUser:", process.env.JWT_SECRET);
    console.log("verifyUser middleware - token:", token ? "[present]" : "[none]");

    if (!token) return res.status(401).json({ message: "No token provided" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verifyUser payload:", payload);

    const user = await User.findById(payload.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("verifyUser error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
