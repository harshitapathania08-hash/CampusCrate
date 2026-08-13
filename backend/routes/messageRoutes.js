const express = require("express");
const router = express.Router();

console.log("messageRoutes.js loaded");

const protect = require("../middleware/authMiddleware");

const {
  sendMessage,
  getMessages,
  getConversations,
  searchUsers,
} = require("../controllers/messageController");

// Get conversations
router.get("/", protect, getConversations);

// Search users
router.get("/search", protect, searchUsers);

// Send a message
router.post("/", protect, sendMessage);

// Get conversation with another user
router.get("/:userId", protect, getMessages);

module.exports = router;