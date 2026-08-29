const axios = require("axios");

async function predictAttendanceRisk(data) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5001/predict-risk",
      data
    );

    return response.data;

  } catch (error) {
    console.error(
      "AI Service Error:",
      error.response?.data || error.message
    );

    throw error;
  }
}

module.exports = {
  predictAttendanceRisk
};