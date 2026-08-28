const Attendance = require("../models/Attendance");

// ========================================
// Mark Attendance
// ========================================
const markAttendance = async (req, res) => {
  try {
    const {
      student,
      subject,
      activity,
      status,
      date,
      markedBy
    } = req.body;

    // Validate required fields
    if (!student || !subject || !status) {
      return res.status(400).json({
        success: false,
        message: "Student, subject and status are required"
      });
    }

    // Create attendance record
    const attendance = await Attendance.create({
      student,
      subject,
      activity: activity || "Class",
      status,
      date: date || new Date(),
      markedBy: markedBy || undefined
    });

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      attendance
    });

  } catch (error) {
    console.error("Mark attendance error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ========================================
// Get All Attendance Records
// ========================================
const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate(
        "student",
        "name registerNumber department year"
      )
      .sort({ date: -1 });

    res.json({
      success: true,
      attendance
    });

  } catch (error) {
    console.error("Get attendance error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ========================================
// Get Attendance of One Student
// ========================================
const getStudentAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      student: req.params.studentId
    })
      .populate(
        "student",
        "name registerNumber department year"
      )
      .sort({ date: -1 });

    res.json({
      success: true,
      attendance
    });

  } catch (error) {
    console.error("Get student attendance error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  markAttendance,
  getAttendance,
  getStudentAttendance
};