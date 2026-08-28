const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    subject: {
      type: String,
      required: true
    },

    activity: {
      type: String,
      enum: [
        "Class",
        "Lab",
        "Assignment",
        "Test",
        "Seminar",
        "Other"
      ],
      default: "Class"
    },

    date: {
      type: Date,
      required: true,
      default: Date.now
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Late"],
      required: true
    },

    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);