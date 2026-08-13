
const Item = require("../models/Item");

// Create Item
const createItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      location,
      date,
    } = req.body;
    const image = req.file ? req.file.path : "";
    // Validate required fields
    if (
      !title ||
      !description ||
      !category ||
      !type ||
      !location ||
      !date
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Create item
    const item = await Item.create({
      title,
      description,
      category,
      type,
      location,
      date,
      image,
      postedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Item posted successfully.",
      item,
    });

  } catch (error) {
    console.error("========== CREATE ITEM ERROR ==========");
    console.error("Message:", error.message);
    console.error("Name:", error.name);
    console.error("Stack:", error.stack);
    console.error("Full Error:", JSON.stringify(error, null, 2));
  
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
// Get All Items
// Get All Items
const getAllItems = async (req, res) => {
  try {
    const { search, category, type, status, location } = req.query;

    let query = {};

    // Search title, description, category and location
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (type) {
      query.type = type;
    }

    if (status) {
      query.status = status;
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const items = await Item.find(query)
      .populate("postedBy", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

  // Get Single Item
const getItemById = async (req, res) => {
    try {
      const item = await Item.findById(req.params.id)
        .populate("postedBy", "fullName email");
  
      if (!item) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }
  
      res.status(200).json({
        success: true,
        item,
      });
  
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

  // Update Item
  const updateItem = async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
  
      if (!item) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }
  
      // Check ownership
      if (item.postedBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to update this item.",
        });
      }
  
      const updateData = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        type: req.body.type,
        location: req.body.location,
        date: req.body.date,
      };
  
      // If a new image was uploaded, update the image
      if (req.file) {
        updateData.image = req.file.path;
      }
  
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );
  
      res.status(200).json({
        success: true,
        message: "Item updated successfully.",
        item: updatedItem,
      });
  
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };


  // Delete Item
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Check ownership
    if (item.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this item.",
      });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Item deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getDashboardStats = async (req, res) => {
  try {
    const lostItems = await Item.countDocuments({ type: "Lost" });
    const foundItems = await Item.countDocuments({ type: "Found" });
    const returnedItems = await Item.countDocuments({ status: "Returned" });

    const Claim = require("../models/Claim");
    const pendingClaims = await Claim.countDocuments({ status: "Pending" });

    res.status(200).json({
      success: true,
      stats: {
        lostItems,
        foundItems,
        pendingClaims,
        returnedItems,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Get My Reports
const getMyReports = async (req, res) => {
  try {
    const items = await Item.find({
      postedBy: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getDashboardStats,
  getMyReports,
};