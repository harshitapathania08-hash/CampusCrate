
const express = require("express");

const router = express.Router();

console.log("itemRoutes.js loaded");
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getDashboardStats,
  getMyReports,
} = require("../controllers/itemController");

// Create Item
router.post(
  "/",
  protect,
  (req, res, next) => {
    console.log("========== POST /api/items REACHED ==========");
    next();
  },
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("========== MULTER ERROR ==========");
        console.error("Message:", err.message);
        console.error("Name:", err.name);
        console.error("Stack:", err.stack);
        return res.status(500).json({
          success: false,
          message: err.message || "Image upload failed",
        });
      }
  
      next();
    });
  },
  (req, res, next) => {
    console.log("========== MULTER FINISHED ==========");
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);
    next();
  },
  createItem
);
router.get("/", getAllItems);
router.get("/dashboard", protect, getDashboardStats);
router.get("/my-reports", protect, getMyReports);
router.get("/:id", getItemById);
router.put("/:id", protect, upload.single("image"), updateItem);
router.delete("/:id", protect, deleteItem);
console.log("PUT route registered");
module.exports = router;