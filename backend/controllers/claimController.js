const Claim = require("../models/Claim");
const Item = require("../models/Item");
const Message = require("../models/Message");
// Create a claim
const createClaim = async (req, res) => {
  try {
    const { itemId, message } = req.body;

    if (!itemId || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields.",
      });
    }

    // Check if item exists
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    // Prevent claiming your own item
    if (item.postedBy.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot claim your own item.",
      });
    }

    // Prevent duplicate claims
    const existingClaim = await Claim.findOne({
      item: itemId,
      claimant: req.user._id,
    });

    if (existingClaim) {
      return res.status(400).json({
        success: false,
        message: "You have already claimed this item.",
      });
    }

    const claim = await Claim.create({
      item: itemId,
      claimant: req.user._id,
      message,
    });
    await Message.create({
      sender: req.user._id,
      receiver: item.postedBy,
      text: message,
      item: item._id,
    });

    res.status(201).json({
      success: true,
      message: "Claim submitted successfully.",
      claim,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get claims for items owned by logged-in user
const getMyItemClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate({
        path: "item",
        match: { postedBy: req.user._id },
      })
      .populate("claimant", "fullName email");

    const filteredClaims = claims.filter(claim => claim.item);

    res.status(200).json({
      success: true,
      count: filteredClaims.length,
      claims: filteredClaims,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Approve or Reject a claim
const updateClaimStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Approved or Rejected.",
      });
    }

    const claim = await Claim.findById(req.params.id).populate("item");

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found.",
      });
    }

    // Only the owner of the item can approve/reject
    if (claim.item.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized.",
      });
    }
    claim.status = status;
    await claim.save();
    
    if (status === "Approved") {
      await Item.findByIdAndUpdate(claim.item._id, {
        status: "Returned",
      });
    }

    res.status(200).json({
      success: true,
      message: `Claim ${status.toLowerCase()} successfully.`,
      claim,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
module.exports = {
  createClaim,
  getMyItemClaims,
  updateClaimStatus,
};