import {
  Brain,
  ArrowLeft,
  AlertTriangle,
  TrendingDown,
  CheckCircle2,
  MessageSquare,
  CalendarCheck,
  UserRound,
  Sparkles,
  ChevronRight
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./RiskMonitor.css";

function RiskMonitor() {

  const navigate = useNavigate();

  const students = [
    {
      id: 1,
      name: "Arun Kumar",
      department: "Computer Science",
      attendance: 62,
      engagement: 48,
      assignments: 55,
      risk: 82,
      level: "High",
      trend: "-18%"
    },
    {
      id: 2,
      name: "Priya Sharma",
      department: "Information Technology",
      attendance: 71,
      engagement: 64,
      assignments: 68,
      risk: 61,
      level: "Medium",
      trend: "-9%"
    },
    {
      id: 3,
      name: "Rahul Raj",
      department: "Computer Science",
      attendance: 91,
      engagement: 87,
      assignments: 92,
      risk: 18,
      level: "Low",
      trend: "+6%"
    }
  ];

  const selectedStudent = students[0];

  return (
    <div className="risk-page">

      {/* HEADER */}

      <header className="risk-header">

        <button
          className="back-button"
          onClick={() => navigate("/faculty")}
        >
          <ArrowLeft size={17} />
          Dashboard
        </button>

        <div className="risk-brand">
          <div className="risk-brand-icon">
            <Brain size={20} />
          </div>

          <strong>AI Risk Monitor</strong>
        </div>

        <div className="ai-status">
          <span></span>
          AI Engine Active
        </div>

      </header>


      <main className="risk-container">

        {/* PAGE TITLE */}

        <div className="risk-title">

          <div>

            <p className="eyebrow">
              INTELLIGENT EARLY WARNING SYSTEM
            </p>

            <h1>
              Student Risk Analysis
            </h1>

            <p>
              AI analyzes attendance, engagement and academic
              behavior to identify students who may need support.
            </p>

          </div>

          <div className="risk-count">

            <strong>12</strong>

            <span>
              students currently
              <br />
              require attention
            </span>

          </div>

        </div>


        {/* STUDENT SELECTOR */}

        <section className="student-selector">

          <div className="selector-title">

            <UserRound size={18} />

            <div>

              <strong>Select Student</strong>

              <small>
                View AI-generated risk analysis
              </small>

            </div>

          </div>

          <div className="student-options">

            {students.map((student) => (

              <button
                key={student.id}
                className={
                  student.id === 1
                    ? "student-option selected"
                    : "student-option"
                }
              >

                <div className="option-avatar">
                  {student.name.charAt(0)}
                </div>

                <div>

                  <strong>{student.name}</strong>

                  <small>
                    {student.attendance}% attendance
                  </small>

                </div>

                <span
                  className={`option-risk ${student.level.toLowerCase()}`}
                >
                  {student.risk}%
                </span>

              </button>

            ))}

          </div>

        </section>


        {/* ANALYSIS */}

        <section className="analysis-grid">

          {/* LEFT */}

          <div className="analysis-left">

            {/* STUDENT PROFILE */}

            <div className="student-profile-card">

              <div className="profile-heading">

                <div className="large-avatar">
                  A
                </div>

                <div>

                  <h2>
                    {selectedStudent.name}
                  </h2>

                  <p>
                    {selectedStudent.department}
                  </p>

                </div>

                <span className="high-risk-badge">
                  HIGH RISK
                </span>

              </div>


              {/* METRICS */}

              <div className="metrics">

                <div className="metric">

                  <div className="metric-icon red">
                    <TrendingDown size={18} />
                  </div>

                  <span>Attendance</span>

                  <strong>
                    {selectedStudent.attendance}%
                  </strong>

                  <small>
                    ↓ 18% this month
                  </small>

                </div>


                <div className="metric">

                  <div className="metric-icon orange">
                    <Brain size={18} />
                  </div>

                  <span>Engagement</span>

                  <strong>
                    {selectedStudent.engagement}
                  </strong>

                  <small>
                    Below average
                  </small>

                </div>


                <div className="metric">

                  <div className="metric-icon purple">
                    <CheckCircle2 size={18} />
                  </div>

                  <span>Assignments</span>

                  <strong>
                    {selectedStudent.assignments}%
                  </strong>

                  <small>
                    3 pending
                  </small>

                </div>

              </div>

            </div>


            {/* AI EXPLANATION */}

            <div className="explanation-card">

              <div className="explanation-header">

                <div className="ai-circle">
                  <Sparkles size={18} />
                </div>

                <div>

                  <h3>
                    Why is this student at risk?
                  </h3>

                  <p>
                    AI-generated explanation
                  </p>

                </div>

              </div>


              <div className="explanation-content">

                <p>
                  The AI model detected a significant decline
                  in Arun's academic engagement over the last
                  three weeks.
                </p>

                <ul>

                  <li>
                    <AlertTriangle size={15} />
                    Attendance dropped by 18%.
                  </li>

                  <li>
                    <AlertTriangle size={15} />
                    Engagement score is below the class average.
                  </li>

                  <li>
                    <AlertTriangle size={15} />
                    Three assignments are currently pending.
                  </li>

                  <li>
                    <AlertTriangle size={15} />
                    Recent participation has decreased.
                  </li>

                </ul>

              </div>

            </div>


            {/* TREND */}

            <div className="trend-card">

              <div className="trend-heading">

                <div>

                  <h3>
                    Engagement Trend
                  </h3>

                  <p>
                    Last 6 weeks
                  </p>

                </div>

                <span className="decline">
                  ↓ 18%
                </span>

              </div>


              <div className="trend-chart">

                <div className="trend-line">

                  <span style={{ height: "85%" }}></span>
                  <span style={{ height: "78%" }}></span>
                  <span style={{ height: "70%" }}></span>
                  <span style={{ height: "60%" }}></span>
                  <span style={{ height: "50%" }}></span>
                  <span style={{ height: "42%" }}></span>

                </div>

                <div className="trend-labels">

                  <span>W1</span>
                  <span>W2</span>
                  <span>W3</span>
                  <span>W4</span>
                  <span>W5</span>
                  <span>W6</span>

                </div>

              </div>

            </div>

          </div>


          {/* RIGHT */}

          <div className="risk-score-column">

            {/* SCORE */}

            <div className="risk-score-card">

              <div className="score-title">

                <Sparkles size={17} />

                AI Risk Score

              </div>

              <div className="risk-circle">

                <div>

                  <strong>
                    82
                  </strong>

                  <span>
                    /100
                  </span>

                </div>

              </div>

              <div className="score-level">
                HIGH RISK
              </div>

              <p>
                Immediate intervention recommended
              </p>

            </div>


            {/* RECOMMENDATIONS */}

            <div className="recommendation-card">

              <div className="recommendation-header">

                <div className="recommendation-icon">
                  <Sparkles size={17} />
                </div>

                <div>

                  <h3>
                    AI Recommendations
                  </h3>

                  <p>
                    Suggested next actions
                  </p>

                </div>

              </div>


              <div className="recommendations">

                <div className="recommendation">

                  <div className="rec-icon">
                    <MessageSquare size={16} />
                  </div>

                  <div>

                    <strong>
                      Contact Student
                    </strong>

                    <p>
                      Send a personalized message
                      regarding attendance.
                    </p>

                  </div>

                  <ChevronRight size={16} />

                </div>


                <div className="recommendation">

                  <div className="rec-icon">
                    <CalendarCheck size={16} />
                  </div>

                  <div>

                    <strong>
                      Schedule Mentoring
                    </strong>

                    <p>
                      Arrange a faculty mentoring session.
                    </p>

                  </div>

                  <ChevronRight size={16} />

                </div>


                <div className="recommendation">

                  <div className="rec-icon">
                    <Brain size={16} />
                  </div>

                  <div>

                    <strong>
                      Monitor for 7 Days
                    </strong>

                    <p>
                      Track attendance and engagement.
                    </p>

                  </div>

                  <ChevronRight size={16} />

                </div>

              </div>


              <button className="intervention-button">

                <Sparkles size={17} />

                Generate AI Intervention Plan

              </button>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default RiskMonitor;