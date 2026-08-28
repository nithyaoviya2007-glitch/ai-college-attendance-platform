import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  BarChart3,
  Brain,
  Bell,
  User,
  LogOut,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    const savedStudent = localStorage.getItem("student");

    if (!savedStudent) {
      navigate("/student-login");
      return;
    }

    setStudent(JSON.parse(savedStudent));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("student");
    navigate("/student-login");
  };

  if (!student) {
    return <div className="student-loading">Loading...</div>;
  }

  return (
    <div className="student-dashboard">

      {/* Sidebar */}
      <aside className="student-sidebar">

        <div className="student-brand">
          <Brain size={28} />
          <span>AI Campus</span>
        </div>

        <nav>
          <button className="student-nav active">
            <LayoutDashboard size={19} />
            Dashboard
          </button>

          <button
  className="student-nav"
  onClick={() => navigate("/student/attendance")}
>
  <CalendarCheck size={19} />
  My Attendance
</button>

          <button
  className="student-nav"
  onClick={() => navigate("/student/analytics")}
>
  <BarChart3 size={19} />
  My Analytics
</button>

          <button
  className="student-nav"
  onClick={() => navigate("/student/ai-insights")}
>
  <Brain size={19} />
  AI Insights
</button>

          <button
  className="student-nav"
  onClick={() => navigate("/student/notifications")}
>
  <Bell size={19} />
  Notifications
</button>

          <button
  className="student-nav"
  onClick={() => navigate("/student/profile")}
>
  <User size={19} />
  Profile
</button>
        </nav>

        <button className="student-logout" onClick={handleLogout}>
          <LogOut size={19} />
          Logout
        </button>

      </aside>

      {/* Main */}
      <main className="student-main">

        <header className="student-header">
          <div>
            <p>Student Dashboard</p>
            <h1>Good Morning, {student.name.split(" ")[0]} 👋</h1>
          </div>

          <div className="student-profile">
            <div className="student-avatar">
              {student.name.charAt(0)}
            </div>

            <div>
              <strong>{student.name}</strong>
              <small>{student.rollNumber}</small>
            </div>
          </div>
        </header>

        {/* Student Info */}
        <section className="student-info-card">
          <div>
            <span>Name</span>
            <strong>{student.name}</strong>
          </div>

          <div>
            <span>Roll Number</span>
            <strong>{student.rollNumber}</strong>
          </div>

          <div>
            <span>Department</span>
            <strong>{student.department}</strong>
          </div>

          <div>
            <span>Year</span>
            <strong>{student.year}</strong>
          </div>

          <div>
            <span>Section</span>
            <strong>{student.section}</strong>
          </div>
        </section>

        {/* Statistics */}
        <section className="student-stat-grid">

          <div className="student-stat-card">
            <div className="stat-icon attendance-icon">
              <CalendarCheck />
            </div>

            <div>
              <span>Attendance</span>
              <h2>82%</h2>
              <small>Good attendance</small>
            </div>
          </div>

          <div className="student-stat-card">
            <div className="stat-icon engagement-icon">
              <TrendingUp />
            </div>

            <div>
              <span>Engagement</span>
              <h2>74</h2>
              <small>Above average</small>
            </div>
          </div>

          <div className="student-stat-card">
            <div className="stat-icon risk-icon">
              <CheckCircle />
            </div>

            <div>
              <span>AI Risk Score</span>
              <h2>18%</h2>
              <small>Low risk</small>
            </div>
          </div>

        </section>

        {/* Main Grid */}
        <section className="student-content-grid">

          {/* Attendance */}
          <div className="student-panel">

            <div className="panel-heading">
              <div>
                <h2>My Attendance</h2>
                <p>Subject-wise attendance</p>
              </div>

              <CalendarCheck size={22} />
            </div>

            <div className="subject-row">
              <span>Database Management</span>
              <strong>88%</strong>
            </div>

            <div className="subject-row">
              <span>Artificial Intelligence</span>
              <strong>82%</strong>
            </div>

            <div className="subject-row">
              <span>Web Technology</span>
              <strong>76%</strong>
            </div>

            <div className="subject-row">
              <span>Operating Systems</span>
              <strong>91%</strong>
            </div>

          </div>

          {/* AI Insights */}
          <div className="student-panel ai-panel">

            <div className="panel-heading">
              <div>
                <h2>AI Insights</h2>
                <p>Your current academic status</p>
              </div>

              <Brain size={22} />
            </div>

            <div className="risk-status">
              <CheckCircle size={25} />

              <div>
                <strong>LOW RISK</strong>
                <span>Risk Score: 18%</span>
              </div>
            </div>

            <div className="ai-message">
              <p>
                Your attendance and engagement are currently healthy.
                Keep maintaining your current performance.
              </p>
            </div>

          </div>

        </section>

        {/* Recommendations */}
        <section className="student-panel recommendations">

          <div className="panel-heading">
            <div>
              <h2>AI Recommendations</h2>
              <p>Personalized suggestions for you</p>
            </div>

            <Brain size={22} />
          </div>

          <div className="recommendation-list">

            <div className="recommendation-item">
              <CheckCircle size={20} />
              <span>Maintain your attendance above 75%</span>
            </div>

            <div className="recommendation-item">
              <TrendingUp size={20} />
              <span>Continue active participation in classes</span>
            </div>

            <div className="recommendation-item">
              <CheckCircle size={20} />
              <span>Complete assignments on time</span>
            </div>

          </div>

        </section>

        {/* Notification */}
        <section className="student-notification">

          <AlertTriangle size={22} />

          <div>
            <strong>Stay on track</strong>
            <p>
              Continue your current learning pattern to maintain a low AI risk score.
            </p>
          </div>

        </section>

      </main>
    </div>
  );
}

export default StudentDashboard;