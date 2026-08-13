const Item = require("../models/Item");
const Claim = require("../models/Claim");

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    // Total reports posted by the user
    const reports = await Item.countDocuments({
      postedBy: userId,
    });

    // Total claims made by the user
    const claims = await Claim.countDocuments({
      claimant: userId,
    });

    // Items successfully returned
    // A claim being Approved means the item was successfully claimed/returned
    const itemsReturned = await Item.countDocuments({
        postedBy: userId,
        status: "Returned",
      });

      const approvedClaims = await Claim.countDocuments({
        claimant: userId,
        status: "Approved",
      });
      
      const rejectedClaims = await Claim.countDocuments({
        claimant: userId,
        status: "Rejected",
      });
      
      let reputation = 5 + approvedClaims * 0.1 - rejectedClaims * 0.3;
      
      reputation = Math.max(1, Math.min(5, reputation));
      
      reputation = Number(reputation.toFixed(1));

    // Recent items posted by user
    const recentItems = await Item.find({
      postedBy: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title type status createdAt");

    // Recent claims made by user
    const recentClaims = await Claim.find({
      claimant: userId,
    })
      .populate("item", "title")
      .sort({ createdAt: -1 })
      .limit(5);

    const activities = [];

    // Add item activities
    recentItems.forEach((item) => {
      activities.push({
        title: `${item.type} ${item.title}`,
        date: item.createdAt,
        status: item.status,
      });
    });

    // Add claim activities
    recentClaims.forEach((claim) => {
      if (claim.item) {
        activities.push({
          title: `Claim for ${claim.item.title}`,
          date: claim.createdAt,
          status: claim.status,
        });
      }
    });

    // Sort newest first
    activities.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.status(200).json({
      success: true,

      stats: {
        reports,
        claims,
        itemsReturned,
        reputation,
      },

      activities: activities.slice(0, 5),
    });
  } catch (error) {
    console.error("Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getProfile,
};