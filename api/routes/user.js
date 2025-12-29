// import express from "express";
// import { UserRegister, UserLogin, GetProfiles } from "../controllers/User.js";

// const router = express.Router();

// router.post("/signup", UserRegister);
// router.post("/signin", UserLogin);
// router.get("/profiles", GetProfiles);

// export default router;



import express from "express";
import { UserRegister, UserLogin, GetProfiles } from "../controllers/User.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);
router.get("/profiles", verifyUser, GetProfiles);

export default router;