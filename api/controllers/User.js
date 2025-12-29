// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import ApiError from "../utils/ApiError.js";
// import ApiResponse from "../utils/ApiResponse.js";

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

// // Register User
// export const UserRegister = async (req, res, next) => {
//   try {
//     const { name, email, password, branch, passoutYear, interviewPrep } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) throw new ApiError(400, "User already exists");

//     const user = await User.create({ name, email, password, branch, passoutYear, interviewPrep });
//     res.status(201).json(new ApiResponse(true, { ...user._doc, token: generateToken(user._id) }, "User registered"));
//   } catch (err) {
//     next(err);
//   }
// };

// // Login User
// export const UserLogin = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) throw new ApiError(401, "Invalid credentials");

//     res.json(new ApiResponse(true, { ...user._doc, token: generateToken(user._id) }, "Login successful"));
//   } catch (err) {
//     next(err);
//   }
// };

// // Get All Profiles (Optional Search)
// export const GetProfiles = async (req, res, next) => {
//   try {
//     const { branch, passoutYear, interviewPrep } = req.query;
//     const filter = {};

//     if (branch) filter.branch = branch;
//     if (passoutYear) filter.passoutYear = passoutYear;
//     if (interviewPrep) filter.interviewPrep = interviewPrep;

//     const users = await User.find(filter).select("-password");
//     res.json(new ApiResponse(true, users, "Profiles fetched"));
//   } catch (err) {
//     next(err);
//   }
// };




import jwt from "jsonwebtoken";
import User from "./models/User.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User
export const UserRegister = async (req, res, next) => {
  try {
    const { name, email, password, branch, passoutYear, interviewPrep } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) throw new ApiError(400, "User already exists");

    const user = await User.create({ name, email, password, branch, passoutYear, interviewPrep });
    res.status(201).json(new ApiResponse(true, { ...user._doc, token: generateToken(user._id) }, "User registered"));
  } catch (err) {
    next(err);
  }
};

// Login User
export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) throw new ApiError(401, "Invalid credentials");

    res.json(new ApiResponse(true, { ...user._doc, token: generateToken(user._id) }, "Login successful"));
  } catch (err) {
    next(err);
  }
};

// Get All Profiles (Optional Search)
export const GetProfiles = async (req, res, next) => {
  try {
    const { branch, passoutYear, interviewPrep } = req.query;
    const filter = {};

    if (branch) filter.branch = branch;
    if (passoutYear) filter.passoutYear = passoutYear;
    if (interviewPrep) filter.interviewPrep = interviewPrep;

    const users = await User.find(filter).select("-password");
    return res.json(new ApiResponse(true, users, "Profiles fetched"));      //Try copying token: generateToken wala part here...
  } catch (err) {
    next(err);
  }
};
