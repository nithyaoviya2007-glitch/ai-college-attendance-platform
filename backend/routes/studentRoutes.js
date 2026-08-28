const express = require("express");

const {
  addStudent,
  getStudents,
  getStudent,
  deleteStudent
} = require("../controllers/studentController");

const router = express.Router();

// POST /api/students
router.post("/", addStudent);

// GET /api/students
router.get("/", getStudents);

// GET /api/students/:id
router.get("/:id", getStudent);

// DELETE /api/students/:id
router.delete("/:id", deleteStudent);

module.exports = router;