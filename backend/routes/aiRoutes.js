const express = require("express");
const router = express.Router();

const { predictAttendanceRisk } = require("../services/aiService");

// Test AI prediction
router.post("/predict-risk", async (req, res) => {
  try {
    const {
      attendance,
      absent_count,
      recent_attendance,
      trend,
    } = req.body;

    if (attendance === undefined) {
      return res.status(400).json({
        message: "Attendance is required",
      });
    }

    const result = await predictAttendanceRisk({
      attendance,
      absent_count: absent_count || 0,
      recent_attendance: recent_attendance || attendance,
      trend: trend || 0,
    });

    res.json(result);

  } catch (error) {
    console.error("AI prediction error:", error.message);

    res.status(500).json({
      message: "AI prediction failed",
      error: error.message,
    });
  }
});

module.exports = router;