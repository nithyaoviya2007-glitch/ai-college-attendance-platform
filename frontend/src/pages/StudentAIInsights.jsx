import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Brain,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  CalendarCheck,
  BookOpen,
} from "lucide-react";

import "./StudentAIInsights.css";

function StudentAIInsights() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const savedStudent = localStorage.getItem("student");

    if (!savedStudent) {
      navigate("/student-login");
      return;
    }

    try {
      setStudent(JSON.parse(savedStudent));
    } catch (error) {
      console.error("Invalid student data:", error);
      localStorage.removeItem("student");
      navigate("/student-login");
    }
  }, [navigate]);

  if (!student) {
    return (
      <div className="ai-loading">
        Loading AI insights...
      </div>
    );
  }

  // Demo AI values
  const attendance = 82;
  const engagement = 74;
  const assignments = 88;

  // Simple demo risk calculation
  const riskScore = Math.round(
    100 -
      (attendance * 0.45 +
        engagement * 0.30 +
        assignments * 0.25)
  );

  let riskLevel = "Low";
  let riskClass = "low";

  if (riskScore >= 60) {
    riskLevel = "High";
    riskClass = "high";
  } else if (riskScore >= 35) {
    riskLevel = "Medium";
    riskClass = "medium";
  }

  return (
    <div className="student-ai-page">

      {/* Header */}
      <header className="student-ai-header">

        <button
          className="ai-back-button"
          onClick={() => navigate("/student")}
        >
          <ArrowLeft size={19} />
          Back to Dashboard
        </button>

        <div className="student-ai-title">

          <div className="student-ai-title-icon">
            <Brain size={28} />
          </div>

          <div>
            <h1>AI Insights</h1>

            <p>
              {student.name} • {student.rollNumber}
            </p>
          </div>

        </div>

      </header>

      <main className="student-ai-content">

        {/* Risk Overview */}
        <section className="ai-risk-card">

          <div className="risk-score-section">

            <div className={`risk-circle ${riskClass}`}>
              <strong>{riskScore}%</strong>
              <span>Risk Score</span>
            </div>

          </div>

          <div className="risk-information">

            <span className={`risk-badge ${riskClass}`}>
              {riskLevel === "Low" ? (
                <CheckCircle size={16} />
              ) : (
                <AlertTriangle size={16} />
              )}

              {riskLevel} Risk
            </span>

            <h2>
              Your current academic risk is {riskLevel.toLowerCase()}
            </h2>

            <p>
              The AI system analyzes your attendance,
              engagement, and academic activity to identify
              possible academic risks.
            </p>

          </div>

        </section>


        {/* Performance Factors */}
        <section className="ai-section">

          <div className="ai-section-heading">

            <div>
              <h2>Performance Factors</h2>

              <p>
                Factors used by the AI risk analysis
              </p>
            </div>

            <Brain size={23} />

          </div>


          <div className="factor-grid">

            {/* Attendance */}
            <div className="factor-card">

              <div className="factor-icon">
                <CalendarCheck size={22} />
              </div>

              <div className="factor-content">

                <div className="factor-top">
                  <span>Attendance</span>
                  <strong>{attendance}%</strong>
                </div>

                <div className="factor-progress">
                  <div
                    style={{
                      width: `${attendance}%`,
                    }}
                  />
                </div>

                <small>
                  Above minimum requirement
                </small>

              </div>

            </div>


            {/* Engagement */}
            <div className="factor-card">

              <div className="factor-icon">
                <TrendingUp size={22} />
              </div>

              <div className="factor-content">

                <div className="factor-top">
                  <span>Engagement</span>
                  <strong>{engagement}</strong>
                </div>

                <div className="factor-progress">
                  <div
                    style={{
                      width: `${engagement}%`,
                    }}
                  />
                </div>

                <small>
                  Good participation level
                </small>

              </div>

            </div>


            {/* Assignments */}
            <div className="factor-card">

              <div className="factor-icon">
                <BookOpen size={22} />
              </div>

              <div className="factor-content">

                <div className="factor-top">
                  <span>Assignments</span>
                  <strong>{assignments}%</strong>
                </div>

                <div className="factor-progress">
                  <div
                    style={{
                      width: `${assignments}%`,
                    }}
                  />
                </div>

                <small>
                  Assignment completion is healthy
                </small>

              </div>

            </div>

          </div>

        </section>


        {/* Why Risk */}
        <section className="ai-section">

          <div className="ai-section-heading">

            <div>
              <h2>Why is your risk score {riskScore}%?</h2>

              <p>
                AI-generated explanation
              </p>
            </div>

            <Brain size={23} />

          </div>


          <div className="ai-reasons">

            <div className="reason good">
              <CheckCircle size={20} />

              <div>
                <strong>Attendance is healthy</strong>

                <p>
                  Your attendance is currently above
                  the required 75% level.
                </p>
              </div>
            </div>


            <div className="reason good">
              <CheckCircle size={20} />

              <div>
                <strong>Engagement is positive</strong>

                <p>
                  Your classroom engagement is showing
                  a healthy pattern.
                </p>
              </div>
            </div>


            <div className="reason good">
              <CheckCircle size={20} />

              <div>
                <strong>Assignments are on track</strong>

                <p>
                  Your assignment completion rate is
                  currently good.
                </p>
              </div>
            </div>

          </div>

        </section>


        {/* Recommendation */}
        <section className="ai-recommendation">

          <div className="recommendation-icon">
            <Brain size={25} />
          </div>

          <div>

            <h2>AI Recommendation</h2>

            <p>
              Continue attending classes regularly and
              maintain your current level of academic
              engagement.
            </p>

            <div className="recommendation-list">

              <span>
                ✓ Maintain attendance above 75%
              </span>

              <span>
                ✓ Complete assignments on time
              </span>

              <span>
                ✓ Continue active classroom participation
              </span>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default StudentAIInsights;