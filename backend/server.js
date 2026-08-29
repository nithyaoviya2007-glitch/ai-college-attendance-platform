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
const authRoutes = require("./routes/authRoutes");

// ========================================
// Create Express App
// ========================================
const app = express();

// ========================================
// Middleware
// ========================================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// ========================================
// API Routes
// ========================================
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);

// ========================================
// Health Check
// ========================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI College Attendance Backend is running!",
  });
});

// ========================================
// 404 Handler
// ========================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ========================================
// Global Error Handler
// ========================================
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ========================================
// Start Server
// ========================================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect MongoDB
    await connectDB();

    // Start Express
    app.listen(PORT, () => {
      console.log("========================================");
      console.log(" AI COLLEGE ATTENDANCE PLATFORM");
      console.log("========================================");
      console.log(`Backend: http://localhost:${PORT}`);
      console.log(`Frontend: http://localhost:5173`);
      console.log("MongoDB: Connected");
      console.log("AI Service: http://127.0.0.1:5001");
      console.log("========================================");
    });
  } catch (error) {
    console.error("========================================");
    console.error("FAILED TO START SERVER");
    console.error("========================================");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();