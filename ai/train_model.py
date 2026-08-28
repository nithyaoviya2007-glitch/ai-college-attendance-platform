import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

# Load training data
data = pd.read_csv("attendance_data.csv")

# Features used by the model
X = data[
    [
        "attendance_percentage",
        "absent_count",
        "recent_attendance",
        "trend"
    ]
]

# Target
y = data["risk"]

# Convert LOW/MEDIUM/HIGH into numbers
encoder = LabelEncoder()
y_encoded = encoder.fit_transform(y)

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.2,
    random_state=42,
    stratify=y_encoded
)

# Create the ML model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

# Train
model.fit(X_train, y_train)

# Check accuracy
accuracy = model.score(X_test, y_test)

print(f"Model accuracy: {accuracy * 100:.2f}%")

# Save model
joblib.dump(model, "model/attendance_risk_model.pkl")

# Save label encoder
joblib.dump(encoder, "model/risk_encoder.pkl")

print("Model saved successfully!")