const Attendance = require("../models/Attendance");
const User = require("../models/User");

// ========================================
// MARK ATTENDANCE
// ========================================
const markAttendance = async (req, res) => {
  try {
    const {
      student,
      subject,
      activity,
      date,
      status,
    } = req.body;

    // Check required fields
    if (!student || !subject || !status) {
      return res.status(400).json({
        success: false,
        message: "Student, subject and status are required",
      });
    }

    // Check student exists
    const studentUser = await User.findOne({
      _id: student,
      role: "student",
    });

    if (!studentUser) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Create attendance record
    const attendance = await Attendance.create({
      student,
      subject,
      activity: activity || "Class",
      date: date || Date.now(),
      status,
      markedBy: req.user ? req.user._id : undefined,
    });

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      attendance,
    });

  } catch (error) {
    console.error("Mark attendance error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// GET ALL ATTENDANCE
// ========================================
const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate(
        "student",
        "name email registerNumber department year section"
      )
      .populate(
        "markedBy",
        "name email role"
      )
      .sort({ date: -1 });

    res.json({
      success: true,
      attendance,
    });

  } catch (error) {
    console.error("Get attendance error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// GET ATTENDANCE OF ONE STUDENT
// ========================================
const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const attendance = await Attendance.find({
      student: studentId,
    })
      .populate(
        "student",
        "name email registerNumber department year section"
      )
      .sort({ date: -1 });

    res.json({
      success: true,
      attendance,
    });

  } catch (error) {
    console.error("Get student attendance error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// GET ATTENDANCE BY SUBJECT
// ========================================
const getSubjectAttendance = async (req, res) => {
  try {
    const { studentId, subject } = req.params;

    const attendance = await Attendance.find({
      student: studentId,
      subject,
    }).sort({ date: -1 });

    res.json({
      success: true,
      attendance,
    });

  } catch (error) {
    console.error("Get subject attendance error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// UPDATE ATTENDANCE
// ========================================
const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance = await Attendance.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    res.json({
      success: true,
      message: "Attendance updated successfully",
      attendance,
    });

  } catch (error) {
    console.error("Update attendance error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// DELETE ATTENDANCE
// ========================================
const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance = await Attendance.findByIdAndDelete(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    res.json({
      success: true,
      message: "Attendance deleted successfully",
    });

  } catch (error) {
    console.error("Delete attendance error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  markAttendance,
  getAllAttendance,
  getStudentAttendance,
  getSubjectAttendance,
  updateAttendance,
  deleteAttendance,
};