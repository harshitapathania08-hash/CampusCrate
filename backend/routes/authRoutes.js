const express = require("express");
console.log("authRoutes.js loaded");

const protect = require("../middleware/authMiddleware");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  getProfileStats,
} = require("../controllers/authController");
// Test Route
router.get("/test", (req, res) => {
  res.json({ message: "Auth route is working" });
});

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get logged-in user's profile
router.get("/profile", protect, getMe);
router.get("/profile/stats", protect, getProfileStats);
router.put("/profile", protect, updateProfile);
module.exports = router;