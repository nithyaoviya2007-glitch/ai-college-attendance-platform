const Student = require("../models/Student");

// Add a student
const addStudent = async (req, res) => {
  try {
    const { name, registerNumber, email, department, year } = req.body;

    const student = await Student.create({
      name,
      registerNumber,
      email,
      department,
      year
    });

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.json({
      success: true,
      students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get one student
const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.json({
      success: true,
      student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.json({
      success: true,
      message: "Student deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addStudent,
  getStudents,
  getStudent,
  deleteStudent
};