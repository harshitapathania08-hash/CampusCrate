const Message = require("../models/Message");

// Send a message
const sendMessage = async (req, res) => {
  try {
    const { receiver, text, item } = req.body;

    if (!receiver || !text) {
      return res.status(400).json({
        success: false,
        message: "Receiver and message are required.",
      });
    }

    const message = await Message.create({
      sender: req.user._id,
      receiver,
      text,
      item: item || null,
    });

    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "fullName email")
      .populate("receiver", "fullName email")
      .populate("item", "title location");

    res.status(201).json({
      success: true,
      message: populatedMessage,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get conversation with another user
const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        {
          sender: req.user._id,
          receiver: userId,
        },
        {
          sender: userId,
          receiver: req.user._id,
        },
      ],
    })
      .populate("sender", "fullName email")
      .populate("receiver", "fullName email")
      .populate("item", "title location")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Get all conversations for logged-in user
const getConversations = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const messages = await Message.find({
        $or: [
          { sender: userId },
          { receiver: userId },
        ],
      })
        .populate("sender", "fullName email")
        .populate("receiver", "fullName email")
        .sort({ createdAt: -1 });
  
      const conversations = [];
      const seenUsers = new Set();
  
      for (const message of messages) {
        const otherUser =
          message.sender._id.toString() === userId.toString()
            ? message.receiver
            : message.sender;
  
        const otherUserId = otherUser._id.toString();
  
        if (!seenUsers.has(otherUserId)) {
          seenUsers.add(otherUserId);
  
          conversations.push({
            user: otherUser,
            lastMessage: message.text,
            time: message.createdAt,
          });
        }
      }
  
      res.status(200).json({
        success: true,
        conversations,
      });
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  const User = require("../models/User");

const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || !query.trim()) {
      return res.status(200).json({
        success: true,
        users: [],
      });
    }

    const users = await User.find({
      _id: { $ne: req.user._id },
      $or: [
        {
          fullName: {
            $regex: query.trim(),
            $options: "i",
          },
        },
        {
          email: {
            $regex: query.trim(),
            $options: "i",
          },
        },
      ],
    })
      .select("_id fullName email profileImage")
      .limit(10);

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error searching users:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  getConversations,
  searchUsers,
};