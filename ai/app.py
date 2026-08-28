from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# Load the trained ML model
model = joblib.load("model/attendance_risk_model.pkl")

# Load the risk label encoder
encoder = joblib.load("model/risk_encoder.pkl")


@app.route("/")
def home():
    return jsonify({
        "message": "AI Attendance Service is running!"
    })


@app.route("/predict-risk", methods=["POST"])
def predict_risk():

    data = request.get_json()

    # Get student attendance information
    attendance = float(data.get("attendance", 0))
    absent_count = int(data.get("absent_count", 0))
    recent_attendance = float(data.get("recent_attendance", attendance))
    trend = float(data.get("trend", 0))

    # Prepare data for ML model
    input_data = pd.DataFrame([{
        "attendance_percentage": attendance,
        "absent_count": absent_count,
        "recent_attendance": recent_attendance,
        "trend": trend
    }])

    # Make prediction
    prediction = model.predict(input_data)

    # Convert prediction back to LOW/MEDIUM/HIGH
    risk = encoder.inverse_transform(prediction)[0]

    # Recommendation for student
    if risk == "HIGH":
        recommendation = "Attendance is at high risk. Student should attend classes regularly."
    elif risk == "MEDIUM":
        recommendation = "Attendance needs improvement. Student should avoid unnecessary absences."
    else:
        recommendation = "Attendance is good. Keep maintaining regular attendance."

    return jsonify({
        "attendance": attendance,
        "risk": risk,
        "recommendation": recommendation
    })


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5001,
        debug=True
    )