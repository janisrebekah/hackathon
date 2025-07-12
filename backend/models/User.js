import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: String,
  email: { type: String, required: true, unique: true },
  avatar: String,
  publicProfile: { type: Boolean, default: true },
  skillsOffered: [String],
  skillsWanted: [String],
  availability: [String],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
