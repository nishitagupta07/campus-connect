
import { Router } from "express";
import verifyUser from "../middleware/verifyUser.js";
import { createPost, getPosts, toggleLike, addComment } from "../controllers/Post.js";
import upload from "../middleware/upload.js";
const router = Router();

router.get("/", getPosts);                         // public
router.post("/", verifyUser, upload.single("image"), createPost); // protected + multer
router.post("/:id/like", verifyUser, toggleLike);
router.post("/:id/comment", verifyUser, addComment);

export default router;
