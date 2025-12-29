


import express from "express";
import { getProfiles, createProfile } from "../controllers/profile.js";

const router = express.Router();

// ✅ Get all profiles

router.get("/", getProfiles);
router.post("/", createProfile);
// router.get("/", async (req, res) => {
//   try {
//     const profiles = await getProfiles(); // should return an array
//     res.status(200).json(profiles);
//   } catch (error) {
//     console.error("Error fetching profiles:", error.message);
//     res.status(500).json({ message: "Failed to fetch profiles", error: error.message });
//   }
// });

// ✅ Create a profile
// router.post("/", async (req, res) => {
//   try {
//     const newProfile = await createProfile(req.body); // should return created profile
//     res.status(201).json(newProfile);
//   } catch (error) {
//     console.error("Error creating profile:", error.message);
//     res.status(500).json({ message: "Failed to create profile", error: error.message });
//   }
// });

export default router;