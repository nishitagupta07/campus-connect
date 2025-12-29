import { Router } from "express";
import verifyUser from "../middleware/verifyUser.js";
const router = Router();

router.get("/auth-check", verifyUser, (req, res) => {
  res.json({ ok: true, user: { id: req.user._id, email: req.user.email } });
});

export default router;
