const express = require("express");

const {
  markAttendance,
  getAttendance,
  getStudentAttendance
} = require("../controllers/attendanceController");

const router = express.Router();

// Mark attendance
router.post("/", markAttendance);

// Get all attendance
router.get("/", getAttendance);

// Get attendance of one student
router.get("/student/:studentId", getStudentAttendance);

module.exports = router;