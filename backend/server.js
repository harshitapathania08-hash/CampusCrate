require("dotenv").config();
const itemRoutes = require("./routes/itemRoutes");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const claimRoutes = require("./routes/claimRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");
const app = express();
const profileRoutes = require("./routes/profileRoutes");
// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use("/api/dashboard", dashboardRoutes);
app.use(express.json());
app.use("/api/profile", profileRoutes);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/claims", claimRoutes);
console.log("Auth routes mounted");


// Test Route
app.get("/", (req, res) => {
  res.send("CampusCrate API is Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});