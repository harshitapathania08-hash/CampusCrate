const express = require("express");
const router = express.Router();
console.log("claimRoutes.js loaded");
const protect = require("../middleware/authMiddleware");
const {
  createClaim,
  getMyItemClaims,
  updateClaimStatus,
} = require("../controllers/claimController");

// Submit a claim
router.post("/", protect, createClaim);
router.get("/my-claims", protect, getMyItemClaims);
router.put("/:id", protect, updateClaimStatus);
module.exports = router;