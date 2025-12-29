// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true, minlength: 6 },
//     branch: { type: String },
//     passoutYear: { type: Number },
//     interviewPrep: { type: String }, // e.g. "Yes" or "No"
//   },
//   { timestamps: true }
// );

// // 🔹 Hash password before saving
// userSchema.pre("save", async function (next) {
//   try {
//     if (!this.isModified("password")) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// // 🔹 Compare entered password with hashed one
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return bcrypt.compare(enteredPassword, this.password);
// };

// // 🔹 Prevent OverwriteModelError in watch mode / hot reload
// const User = mongoose.models.User || mongoose.model("User", userSchema);

// export default User;



import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    branch: { type: String },
    passoutYear: { type: Number },
    interviewPrep: { type: String }, // e.g. "Yes" or "No"
  },
  { timestamps: true }
);

// 🔹 Hash password before saving
userSchema.pre("save", async function (next) {       //  .pre is hashing passwords already. No need to hash password manually in Routes
  try {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔹 Compare entered password with hashed one
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// 🔹 Prevent OverwriteModelError in watch mode / hot reload
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;