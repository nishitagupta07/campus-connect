import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  branch: { type: String, required: true },
  passoutYear: { type: Number, required: true },
  category: { type: String, required: true }, // Interview prep category
  location: { type: String },
  linkedIn: { type: String },
  bio: { type: String },
  skills: [{ type: String }],
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);
