from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# Load ML model
model = joblib.load("model/attendance_risk_model.pkl")

# Load risk encoder
encoder = joblib.load("model/risk_encoder.pkl")


@app.route("/")
def home():
    return jsonify({
        "success": True,
        "message": "AI Attendance Service is running!"
    })


def generate_recommendations(subjects):
    recommendations = []

    for subject in subjects:
        name = subject.get("subject", "Unknown Subject")
        attendance = float(subject.get("attendance", 0))
        activity = subject.get("activity", "Class")

        if attendance < 60:
            recommendations.append(
                f"URGENT: Improve {name} attendance. "
                f"Current attendance is {attendance:.1f}%. "
                f"Prioritize upcoming {activity} sessions."
            )

        elif attendance < 75:
            recommendations.append(
                f"Focus on {name}. Current attendance is {attendance:.1f}%. "
                f"Attend upcoming {activity} sessions regularly."
            )

        elif attendance < 85:
            recommendations.append(
                f"Maintain regular attendance in {name} "
                f"({attendance:.1f}%) and avoid unnecessary absences."
            )

    return recommendations


def generate_faculty_alerts(subjects):
    alerts = []

    for subject in subjects:
        name = subject.get("subject", "Unknown Subject")
        attendance = float(subject.get("attendance", 0))
        activity = subject.get("activity", "Class")

        if attendance < 60:
            alerts.append({
                "subject": name,
                "attendance": attendance,
                "activity": activity,
                "severity": "HIGH",
                "message": (
                    f"Student needs immediate attention in {name}. "
                    f"Attendance is {attendance:.1f}%."
                )
            })

        elif attendance < 75:
            alerts.append({
                "subject": name,
                "attendance": attendance,
                "activity": activity,
                "severity": "MEDIUM",
                "message": (
                    f"Monitor student attendance in {name}. "
                    f"Current attendance is {attendance:.1f}%."
                )
            })

    return alerts


@app.route("/predict-risk", methods=["POST"])
def predict_risk():

    data = request.get_json() or {}

    attendance = float(data.get("attendance", 0))
    absent_count = int(data.get("absent_count", 0))
    recent_attendance = float(
        data.get("recent_attendance", attendance)
    )
    trend = float(data.get("trend", 0))

    # Subject-wise information
    subjects = data.get("subjects", [])

    # ML input
    input_data = pd.DataFrame([{
        "attendance_percentage": attendance,
        "absent_count": absent_count,
        "recent_attendance": recent_attendance,
        "trend": trend
    }])

    # ML prediction
    prediction = model.predict(input_data)

    risk = encoder.inverse_transform(prediction)[0]

    # Personalized recommendations
    recommendations = generate_recommendations(subjects)

    # Faculty alerts
    faculty_alerts = generate_faculty_alerts(subjects)

    # Overall recommendation
    if risk == "HIGH":
        overall_recommendation = (
            "Your attendance is at high risk. "
            "Immediate improvement is required."
        )

    elif risk == "MEDIUM":
        overall_recommendation = (
            "Your attendance needs improvement. "
            "Avoid unnecessary absences."
        )

    else:
        overall_recommendation = (
            "Your attendance is currently healthy. "
            "Continue maintaining regular attendance."
        )

    # Early warning
    early_warning = False

    if risk in ["HIGH", "MEDIUM"]:
        early_warning = True

    if attendance < 75:
        early_warning = True

    return jsonify({

        "success": True,

        "attendance": attendance,

        "risk": risk,

        "early_warning": early_warning,

        "overall_recommendation": overall_recommendation,

        "recommendations": recommendations,

        "faculty_alerts": faculty_alerts,

        "subjects_analyzed": len(subjects)
    })


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5001,
        debug=True
    )