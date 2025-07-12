// backend/routes/auth.js
import express from "express";
import passport from "passport";

const router = express.Router();

// 🧩 Step 1: Initiate Google OAuth login
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

// 🧩 Step 2: Handle Google OAuth callback
router.get("/google/callback", passport.authenticate("google", {
  failureRedirect: "/auth/login-failed",
}), (req, res) => {
  // ✅ On successful login, redirect to frontend dashboard
  res.redirect("http://localhost:3000/dashboard");
});

// ❌ Optional failure route
router.get("/login-failed", (req, res) => {
  res.status(401).json({ message: "❌ Login failed" });
});

// ✅ Optional success route (used only if you need session-based fetch)
router.get("/login-success", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const { _id, name, email, avatar, role, skillsOffered, skillsWanted } = req.user;

  res.status(200).json({
    message: "🎉 Login successful!",
    user: {
      _id,
      name,
      email,
      avatar,
      role,
      skillsOffered,
      skillsWanted,
    },
  });
});

// 🚪 Logout route
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

export default router;
