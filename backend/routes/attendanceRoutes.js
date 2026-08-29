const express = require("express");

const {
  markAttendance,
  getAllAttendance,
  getStudentAttendance,
  getSubjectAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

const router = express.Router();

// ========================================
// MARK ATTENDANCE
// POST /api/attendance
// ========================================
router.post("/", markAttendance);

// ========================================
// GET ALL ATTENDANCE
// GET /api/attendance
// ========================================
router.get("/", getAllAttendance);

// ========================================
// GET ONE STUDENT'S ATTENDANCE
// GET /api/attendance/student/:studentId
// ========================================
router.get("/student/:studentId", getStudentAttendance);

// ========================================
// GET ATTENDANCE BY SUBJECT
// GET /api/attendance/student/:studentId/subject/:subject
// ========================================
router.get(
  "/student/:studentId/subject/:subject",
  getSubjectAttendance
);

// ========================================
// UPDATE ATTENDANCE
// PUT /api/attendance/:id
// ========================================
router.put("/:id", updateAttendance);

// ========================================
// DELETE ATTENDANCE
// DELETE /api/attendance/:id
// ========================================
router.delete("/:id", deleteAttendance);

module.exports = router;