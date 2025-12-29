import Profile from "../models/profile.js";

// Get all profiles with search filters
export const getProfiles = async (req, res) => {
  try {
    const { search, branch, passoutYear, category } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { branch: { $regex: search, $options: "i" } },
        { skills: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } }
      ];
    }

    if (branch && branch !== "All Branches") {
      query.branch = branch;
    }

    if (passoutYear && passoutYear !== "All Years") {
      query.passoutYear = Number(passoutYear);
    }

    if (category && category !== "All Categories") {
      query.category = category;
    }

    const profiles = await Profile.find(query);
    res.status(200).json(profiles);

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Create new profile (for registration)
export const createProfile = async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ message: "Failed to create profile", error: err.message });
  }
};
