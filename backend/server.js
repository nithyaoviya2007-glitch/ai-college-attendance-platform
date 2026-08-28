// ========================================
// DNS configuration for MongoDB Atlas
// ========================================
const dns = require("dns");

dns.setServers(["1.1.1.1", "1.0.0.1"]);

// ========================================
// Imports
// ========================================
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// ========================================
// Database
// ========================================
const connectDB = require("./config/db");

// ========================================
// Routes
// ========================================
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const aiRoutes = require("./routes/aiRoutes");

// ========================================
// Create Express app
// ========================================
const app = express();

// ========================================
// Middleware
// ========================================
app.use(cors());
app.use(express.json());

// ========================================
// API Routes
// ========================================
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/ai", aiRoutes);

// ========================================
// Test route
// ========================================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI College Attendance Backend is running!"
  });
});

// ========================================
// Start server
// ========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// ========================================
// Connect to MongoDB
// ========================================
connectDB();