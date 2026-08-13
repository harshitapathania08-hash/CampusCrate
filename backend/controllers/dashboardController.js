const Item = require("../models/Item");
const Claim = require("../models/Claim");

const getDashboardStats = async (req, res) => {
  try {
    const totalLost = await Item.countDocuments({ type: "Lost" });

    const totalFound = await Item.countDocuments({ type: "Found" });

    const myPosts = await Item.countDocuments({
      postedBy: req.user._id,
    });

    const myClaims = await Claim.countDocuments({
      claimant: req.user._id,
    });

    res.status(200).json({
      success: true,
      stats: {
        totalLost,
        totalFound,
        myPosts,
        myClaims,
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

module.exports = {
  getDashboardStats,
};