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

  // ========================================
  // LOAD LOGGED-IN STUDENT
  // ========================================

  useEffect(() => {
    const savedStudent =
      localStorage.getItem("student");

    const savedUser =
      localStorage.getItem("user");

    console.log(
      "LOCALSTORAGE STUDENT:",
      savedStudent
    );

    console.log(
      "LOCALSTORAGE USER:",
      savedUser
    );

    if (!savedStudent) {
      navigate("/login");
      return;
    }

    try {
      const studentData =
        JSON.parse(savedStudent);

      setStudent(studentData);
    } catch (error) {
      console.error(
        "Student data error:",
        error
      );

      localStorage.removeItem("student");

      navigate("/login");
    }
  }, [navigate]);

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("student");
    localStorage.removeItem("faculty");

    navigate("/login");
  };

  // ========================================
  // LOADING
  // ========================================

  if (!student) {
    return (
      <div className="student-loading">
        Loading...
      </div>
    );
  }

  // ========================================
  // DISPLAY
  // ========================================

  return (
    <div className="student-dashboard">

      {/* SIDEBAR */}

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
            onClick={() =>
              navigate("/student/attendance")
            }
          >
            <CalendarCheck size={19} />
            My Attendance
          </button>

          <button
            className="student-nav"
            onClick={() =>
              navigate("/student/analytics")
            }
          >
            <BarChart3 size={19} />
            My Analytics
          </button>

          <button
            className="student-nav"
            onClick={() =>
              navigate("/student/ai-insights")
            }
          >
            <Brain size={19} />
            AI Insights
          </button>

          <button
            className="student-nav"
            onClick={() =>
              navigate("/student/notifications")
            }
          >
            <Bell size={19} />
            Notifications
          </button>

          <button
            className="student-nav"
            onClick={() =>
              navigate("/student/profile")
            }
          >
            <User size={19} />
            Profile
          </button>

        </nav>

        <button
          className="student-logout"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          Logout
        </button>

      </aside>

      {/* MAIN */}

      <main className="student-main">

        {/* HEADER */}

        <header className="student-header">

          <div>

            <p>Student Dashboard</p>

            <h1>
              Good Morning,{" "}
              {student.name.split(" ")[0]} 👋
            </h1>

          </div>

          <div className="student-profile">

            <div className="student-avatar">
              {student.name.charAt(0)}
            </div>

            <div>

              <strong>
                {student.name}
              </strong>

              <small>
                {student.rollNumber}
              </small>

            </div>

          </div>

        </header>

        {/* ========================================
            ACTUAL USER INFORMATION
        ======================================== */}

        <section className="student-info-card">

          <div>
            <span>Name</span>
            <strong>
              {student.name}
            </strong>
          </div>

          <div>
            <span>Email</span>
            <strong>
              {student.email}
            </strong>
          </div>

          <div>
            <span>Roll Number</span>
            <strong>
              {student.rollNumber}
            </strong>
          </div>

          <div>
            <span>Department</span>
            <strong>
              {student.department}
            </strong>
          </div>

          <div>
            <span>Year</span>
            <strong>
              {student.year
                ? `${student.year}${student.year === 1
                  ? "st"
                  : student.year === 2
                  ? "nd"
                  : student.year === 3
                  ? "rd"
                  : "th"} Year`
                : "-"}
            </strong>
          </div>

          <div>
            <span>Section</span>

            <strong>
              {student.section
                ? `Section ${student.section}`
                : "Not Available"}
            </strong>
          </div>

        </section>

        {/* ========================================
            STATISTICS
        ======================================== */}

        <section className="student-stat-grid">

          <div className="student-stat-card">

            <div className="stat-icon attendance-icon">
              <CalendarCheck />
            </div>

            <div>

              <span>Attendance</span>

              <h2>82%</h2>

              <small>
                Current attendance
              </small>

            </div>

          </div>

          <div className="student-stat-card">

            <div className="stat-icon engagement-icon">
              <TrendingUp />
            </div>

            <div>

              <span>Engagement</span>

              <h2>74</h2>

              <small>
                Current engagement
              </small>

            </div>

          </div>

          <div className="student-stat-card">

            <div className="stat-icon risk-icon">
              <CheckCircle />
            </div>

            <div>

              <span>AI Risk Score</span>

              <h2>18%</h2>

              <small>
                Current risk
              </small>

            </div>

          </div>

        </section>

        {/* ========================================
            ATTENDANCE
        ======================================== */}

        <section className="student-content-grid">

          <div className="student-panel">

            <div className="panel-heading">

              <div>

                <h2>
                  My Attendance
                </h2>

                <p>
                  Subject-wise attendance
                </p>

              </div>

              <CalendarCheck size={22} />

            </div>

            <div className="subject-row">
              <span>
                Database Management
              </span>

              <strong>88%</strong>
            </div>

            <div className="subject-row">
              <span>
                Artificial Intelligence
              </span>

              <strong>82%</strong>
            </div>

            <div className="subject-row">
              <span>
                Web Technology
              </span>

              <strong>76%</strong>
            </div>

            <div className="subject-row">
              <span>
                Operating Systems
              </span>

              <strong>91%</strong>
            </div>

          </div>

          {/* AI */}

          <div className="student-panel ai-panel">

            <div className="panel-heading">

              <div>

                <h2>
                  AI Insights
                </h2>

                <p>
                  Personalized for {student.name}
                </p>

              </div>

              <Brain size={22} />

            </div>

            <div className="risk-status">

              <CheckCircle size={25} />

              <div>

                <strong>
                  LOW RISK
                </strong>

                <span>
                  Risk Score: 18%
                </span>

              </div>

            </div>

            <div className="ai-message">

              <p>
                Welcome {student.name}.
                Your academic dashboard is
                personalized using your account
                information.
              </p>

            </div>

          </div>

        </section>

        {/* ========================================
            RECOMMENDATIONS
        ======================================== */}

        <section className="student-panel recommendations">

          <div className="panel-heading">

            <div>

              <h2>
                AI Recommendations
              </h2>

              <p>
                Personalized suggestions for{" "}
                {student.name}
              </p>

            </div>

            <Brain size={22} />

          </div>

          <div className="recommendation-list">

            <div className="recommendation-item">
              <CheckCircle size={20} />

              <span>
                Maintain your attendance above 75%
              </span>
            </div>

            <div className="recommendation-item">
              <TrendingUp size={20} />

              <span>
                Continue active participation
                in classes
              </span>
            </div>

            <div className="recommendation-item">
              <CheckCircle size={20} />

              <span>
                Complete assignments on time
              </span>
            </div>

          </div>

        </section>

        {/* NOTIFICATION */}

        <section className="student-notification">

          <AlertTriangle size={22} />

          <div>

            <strong>
              Personalized Student Dashboard
            </strong>

            <p>
              Logged in as{" "}
              {student.name} —{" "}
              {student.department},{" "}
              Section {student.section}.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default StudentDashboard;