import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Brain,
  BarChart3,
  Bell,
  Settings,
  Search,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Sparkles,
  ArrowUpRight,
  LogOut,
  CalendarDays
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./FacultyDashboard.css";

function FacultyDashboard() {
  const navigate = useNavigate();

  const students = [
    {
      id: 1,
      name: "Arun Kumar",
      department: "Computer Science",
      attendance: 62,
      engagement: 48,
      risk: "High"
    },
    {
      id: 2,
      name: "Priya Sharma",
      department: "Information Technology",
      attendance: 71,
      engagement: 64,
      risk: "Medium"
    },
    {
      id: 3,
      name: "Rahul Raj",
      department: "Computer Science",
      attendance: 91,
      engagement: 87,
      risk: "Low"
    },
    {
      id: 4,
      name: "Divya S",
      department: "Artificial Intelligence",
      attendance: 95,
      engagement: 92,
      risk: "Low"
    }
  ];

  const getRiskClass = (risk) => {
    if (risk === "High") return "risk-high";
    if (risk === "Medium") return "risk-medium";
    return "risk-low";
  };

  return (
    <div className="dashboard-layout">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Brain size={21} />
          </div>

          <span>AttendAI</span>
        </div>


        {/* MAIN MENU */}

        <div className="menu-section">

          <p className="menu-title">
            MAIN
          </p>


          {/* DASHBOARD */}

          <button
            className="menu-item active"
            onClick={() => navigate("/faculty")}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>


          {/* STUDENTS */}

          <button
            className="menu-item"
            onClick={() => navigate("/students")}
          >
            <Users size={18} />
            Students
          </button>


          {/* ATTENDANCE */}

          <button
            className="menu-item"
            onClick={() => navigate("/attendance")}
          >
            <CalendarDays size={18} />
            Attendance
          </button>


          {/* AI RISK MONITOR */}

          <button
            className="menu-item"
            onClick={() => navigate("/risk-monitor")}
          >
            <Brain size={18} />
            AI Risk Monitor
          </button>


          {/* ANALYTICS */}

          <button
  className="menu-item"
  onClick={() => navigate("/analytics")}
>
  <BarChart3 size={18} />
  <span>Analytics</span>
</button>

        </div>


        {/* TOOLS */}

        <div className="menu-section">

          <p className="menu-title">
            TOOLS
          </p>


          {/* WHAT IF SIMULATOR */}

          <button
            className="menu-item"
            onClick={() => navigate("/simulator")}
          >
            <Sparkles size={18} />
            What-If Simulator
          </button>


          {/* SETTINGS */}

          <button
  className="menu-item"
  onClick={() => navigate("/settings")}
>
  <Settings size={18} />
  <span>Settings</span>
</button>

        </div>


        {/* SIDEBAR BOTTOM */}

        <div className="sidebar-bottom">

          <div className="profile-mini">

            <div className="avatar">
              FK
            </div>

            <div>
              <strong>
                Faculty Kumar
              </strong>

              <small>
                Administrator
              </small>
            </div>

          </div>


          {/* LOGOUT */}

          <button
            className="logout-btn"
            onClick={() => navigate("/login")}
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="dashboard-main">


        {/* HEADER */}

        <header className="dashboard-header">

          <div>

            <p className="welcome">
              Friday, August 28, 2026
            </p>

            <h1>
              Good morning, Faculty 👋
            </h1>

            <p className="header-description">
              Here's what's happening with your students today.
            </p>

          </div>


          <div className="header-actions">


            {/* SEARCH */}

            <div className="search-box">

              <Search size={17} />

              <input
                placeholder="Search students..."
              />

            </div>


            {/* NOTIFICATION */}

            <button
              className="notification-btn"
              onClick={() => {
                alert("You have 3 notifications.");
              }}
            >
              <Bell size={19} />

              <span>
                3
              </span>
            </button>


            {/* PROFILE */}

            <div className="faculty-profile">

              <div className="avatar">
                FK
              </div>

              <div>

                <strong>
                  Faculty Kumar
                </strong>

                <small>
                  Faculty
                </small>

              </div>

              <ChevronDown size={16} />

            </div>

          </div>

        </header>


        {/* ================= STATISTICS ================= */}

        <section className="stats-grid">


          {/* TOTAL STUDENTS */}

          <div
            className="stat-card"
            onClick={() => navigate("/students")}
            style={{ cursor: "pointer" }}
          >

            <div className="stat-top">

              <div className="stat-icon purple">
                <Users size={20} />
              </div>

              <span className="trend positive">
                <TrendingUp size={14} />
                8.2%
              </span>

            </div>

            <p>
              Total Students
            </p>

            <h2>
              120
            </h2>

            <small>
              Across 4 departments
            </small>

          </div>


          {/* ATTENDANCE */}

          <div
            className="stat-card"
            onClick={() => navigate("/attendance")}
            style={{ cursor: "pointer" }}
          >

            <div className="stat-top">

              <div className="stat-icon green">
                <ClipboardCheck size={20} />
              </div>

              <span className="trend positive">
                <TrendingUp size={14} />
                3.4%
              </span>

            </div>

            <p>
              Today's Attendance
            </p>

            <h2>
              86.4%
            </h2>

            <small>
              104 of 120 present
            </small>

          </div>


          {/* ENGAGEMENT */}

          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon orange">
                <Brain size={20} />
              </div>

              <span className="trend positive">
                <TrendingUp size={14} />
                5.7%
              </span>

            </div>

            <p>
              Engagement Score
            </p>

            <h2>
              74.8
            </h2>

            <small>
              University average
            </small>

          </div>


          {/* RISK */}

          <div
            className="stat-card"
            onClick={() => navigate("/risk-monitor")}
            style={{ cursor: "pointer" }}
          >

            <div className="stat-top">

              <div className="stat-icon red">
                <AlertTriangle size={20} />
              </div>

              <span className="trend negative">
                <TrendingDown size={14} />
                2.1%
              </span>

            </div>

            <p>
              Students at Risk
            </p>

            <h2>
              12
            </h2>

            <small>
              5 high risk students
            </small>

          </div>

        </section>


        {/* ================= CONTENT GRID ================= */}

        <section className="dashboard-grid">


          {/* AI WARNING */}

          <div className="ai-warning-card">

            <div className="card-header">

              <div>

                <div className="ai-title">

                  <div className="ai-title-icon">
                    <Sparkles size={17} />
                  </div>

                  <span>
                    AI Early Warning
                  </span>

                </div>

                <p>
                  Students requiring immediate attention
                </p>

              </div>


              <button
                onClick={() => navigate("/risk-monitor")}
              >
                View all
                <ArrowUpRight size={15} />
              </button>

            </div>


            <div className="risk-summary">

              <div>
                <strong className="red-text">
                  5
                </strong>

                <span>
                  High Risk
                </span>
              </div>


              <div>
                <strong className="orange-text">
                  7
                </strong>

                <span>
                  Medium Risk
                </span>
              </div>


              <div>
                <strong className="green-text">
                  108
                </strong>

                <span>
                  Low Risk
                </span>
              </div>

            </div>


            <div className="warning-message">

              <AlertTriangle size={20} />

              <div>

                <strong>
                  AI detected attendance decline
                </strong>

                <p>
                  5 students show a significant drop in
                  attendance and engagement over the last 3 weeks.
                </p>

              </div>

            </div>

          </div>


          {/* ATTENDANCE OVERVIEW */}

          <div className="attendance-card">

            <div className="card-header">

              <div>

                <h3>
                  Attendance Overview
                </h3>

                <p>
                  Weekly attendance performance
                </p>

              </div>

              <button className="dropdown-btn">
                This Week
                <ChevronDown size={14} />
              </button>

            </div>


            <div className="attendance-chart">

              <div className="chart-bars">


                <div className="bar-item">

                  <div
                    className="bar"
                    style={{ height: "70%" }}
                  />

                  <span>
                    Mon
                  </span>

                </div>


                <div className="bar-item">

                  <div
                    className="bar"
                    style={{ height: "84%" }}
                  />

                  <span>
                    Tue
                  </span>

                </div>


                <div className="bar-item">

                  <div
                    className="bar"
                    style={{ height: "76%" }}
                  />

                  <span>
                    Wed
                  </span>

                </div>


                <div className="bar-item">

                  <div
                    className="bar"
                    style={{ height: "92%" }}
                  />

                  <span>
                    Thu
                  </span>

                </div>


                <div className="bar-item">

                  <div
                    className="bar active-bar"
                    style={{ height: "86%" }}
                  />

                  <span>
                    Fri
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= STUDENT RISK TABLE ================= */}

        <section className="students-section">


          <div className="section-header">

            <div>

              <h2>
                Student Risk Overview
              </h2>

              <p>
                AI-powered student performance analysis
              </p>

            </div>


            <button
              className="view-students"
              onClick={() => navigate("/students")}
            >
              View all students
              <ArrowUpRight size={15} />
            </button>

          </div>


          <div className="student-table">


            {/* TABLE HEADER */}

            <div className="table-header">

              <span>
                STUDENT
              </span>

              <span>
                ATTENDANCE
              </span>

              <span>
                ENGAGEMENT
              </span>

              <span>
                RISK LEVEL
              </span>

              <span>
                ACTION
              </span>

            </div>


            {/* STUDENTS */}

            {students.map((student) => (

              <div
                className="student-row"
                key={student.id}
              >


                {/* STUDENT */}

                <div className="student-name">

                  <div className="student-avatar">
                    {student.name.charAt(0)}
                  </div>

                  <div>

                    <strong>
                      {student.name}
                    </strong>

                    <small>
                      {student.department}
                    </small>

                  </div>

                </div>


                {/* ATTENDANCE */}

                <div className="attendance-value">

                  <span>
                    {student.attendance}%
                  </span>

                  <div className="progress">

                    <div
                      style={{
                        width: `${student.attendance}%`
                      }}
                    />

                  </div>

                </div>


                {/* ENGAGEMENT */}

                <div className="engagement-value">

                  <span>
                    {student.engagement}
                  </span>

                  {student.engagement >= 70 ? (
                    <TrendingUp size={15} />
                  ) : (
                    <TrendingDown size={15} />
                  )}

                </div>


                {/* RISK */}

                <div>

                  <span
                    className={`risk-badge ${getRiskClass(
                      student.risk
                    )}`}
                  >
                    {student.risk}
                  </span>

                </div>


                {/* ACTION */}

                <div>

                  <button
                    className="action-btn"
                    onClick={() => {

                      if (student.risk === "High") {
                        navigate("/risk-monitor");
                      } else {
                        navigate("/students");
                      }

                    }}
                  >
                    View
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default FacultyDashboard;