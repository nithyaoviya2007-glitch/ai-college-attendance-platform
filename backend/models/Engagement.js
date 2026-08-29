const mongoose = require("mongoose");

const engagementSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    assignmentScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    testScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    participation: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    assignmentCompletion: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    engagementScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Engagement", engagementSchema);