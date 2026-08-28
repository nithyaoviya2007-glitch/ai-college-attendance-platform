import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  GraduationCap,
  Calendar,
  ShieldCheck,
  LogOut,
  Brain,
  CalendarCheck,
} from "lucide-react";

import "./StudentProfile.css";

function StudentProfile() {
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
      console.error("Invalid student data");
      localStorage.removeItem("student");
      navigate("/student-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("student");
    navigate("/student-login");
  };

  if (!student) {
    return (
      <div className="profile-loading">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="student-profile-page">

      {/* Header */}

      <header className="profile-header">

        <button
          className="profile-back-button"
          onClick={() => navigate("/student")}
        >
          <ArrowLeft size={19} />
          Back to Dashboard
        </button>

        <div className="profile-title">

          <div className="profile-title-icon">
            <User size={27} />
          </div>

          <div>
            <h1>My Profile</h1>
            <p>View your student information</p>
          </div>

        </div>

      </header>


      <main className="profile-content">

        {/* Profile Card */}

        <section className="profile-main-card">

          <div className="profile-avatar">
            {student.name
              ? student.name.charAt(0).toUpperCase()
              : "S"}
          </div>

          <div className="profile-main-info">

            <h2>{student.name}</h2>

            <p>
              {student.rollNumber || "Student"}
            </p>

            <span className="active-status">
              Active Student
            </span>

          </div>

        </section>


        {/* Personal Information */}

        <section className="profile-section">

          <div className="profile-section-heading">
            <User size={21} />

            <div>
              <h2>Personal Information</h2>
              <p>Your basic student information</p>
            </div>
          </div>


          <div className="profile-info-grid">

            <div className="info-item">

              <div className="info-icon">
                <User size={19} />
              </div>

              <div>
                <span>Full Name</span>
                <strong>{student.name}</strong>
              </div>

            </div>


            <div className="info-item">

              <div className="info-icon">
                <Mail size={19} />
              </div>

              <div>
                <span>Email</span>
                <strong>
                  {student.email || "student@example.com"}
                </strong>
              </div>

            </div>

          </div>

        </section>


        {/* Academic Information */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <GraduationCap size={21} />

            <div>
              <h2>Academic Information</h2>
              <p>Your academic details</p>
            </div>

          </div>


          <div className="profile-info-grid">

            <div className="info-item">

              <div className="info-icon">
                <GraduationCap size={19} />
              </div>

              <div>
                <span>Roll Number</span>

                <strong>
                  {student.rollNumber || "Not Available"}
                </strong>
              </div>

            </div>


            <div className="info-item">

              <div className="info-icon">
                <Calendar size={19} />
              </div>

              <div>
                <span>Year</span>

                <strong>
                  {student.year || "3rd Year"}
                </strong>
              </div>

            </div>


            <div className="info-item">

              <div className="info-icon">
                <GraduationCap size={19} />
              </div>

              <div>
                <span>Department</span>

                <strong>
                  {student.department || "Computer Science"}
                </strong>
              </div>

            </div>


            <div className="info-item">

              <div className="info-icon">
                <User size={19} />
              </div>

              <div>
                <span>Section</span>

                <strong>
                  {student.section || "A"}
                </strong>
              </div>

            </div>

          </div>

        </section>


        {/* Academic Summary */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <CalendarCheck size={21} />

            <div>
              <h2>Academic Summary</h2>
              <p>Your current academic status</p>
            </div>

          </div>


          <div className="summary-grid">

            <div className="summary-card">

              <CalendarCheck size={24} />

              <span>Attendance</span>

              <strong>82%</strong>

              <small>
                Above 75% requirement
              </small>

            </div>


            <div className="summary-card">

              <Brain size={24} />

              <span>AI Risk Score</span>

              <strong>18%</strong>

              <small>
                Low Risk
              </small>

            </div>


            <div className="summary-card">

              <ShieldCheck size={24} />

              <span>Academic Status</span>

              <strong>Good</strong>

              <small>
                Continue your progress
              </small>

            </div>

          </div>

        </section>


        {/* Account Actions */}

        <section className="profile-actions">

          <button
            className="ai-profile-button"
            onClick={() => navigate("/student/ai-insights")}
          >
            <Brain size={19} />
            View AI Insights
          </button>


          <button
            className="logout-button"
            onClick={handleLogout}
          >
            <LogOut size={19} />
            Logout
          </button>

        </section>

      </main>

    </div>
  );
}

export default StudentProfile;