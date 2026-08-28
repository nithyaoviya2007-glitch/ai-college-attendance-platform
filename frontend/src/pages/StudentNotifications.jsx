import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  CalendarCheck,
  Brain,
  CheckCircle,
  AlertTriangle,
  BookOpen,
} from "lucide-react";

import "./StudentNotifications.css";

function StudentNotifications() {
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
      <div className="notifications-loading">
        Loading notifications...
      </div>
    );
  }

  const notifications = [
    {
      id: 1,
      type: "warning",
      icon: AlertTriangle,
      title: "Attendance Alert",
      message:
        "Your Web Technology attendance is currently at 75%. Try to attend upcoming classes regularly.",
      time: "Today",
    },

    {
      id: 2,
      type: "ai",
      icon: Brain,
      title: "AI Performance Update",
      message:
        "Your overall academic risk is currently Low. Your attendance and engagement are showing a positive trend.",
      time: "Yesterday",
    },

    {
      id: 3,
      type: "attendance",
      icon: CalendarCheck,
      title: "Attendance Updated",
      message:
        "Your attendance record has been updated for today's classes.",
      time: "2 days ago",
    },

    {
      id: 4,
      type: "academic",
      icon: BookOpen,
      title: "Assignment Reminder",
      message:
        "You have an upcoming assignment. Complete it before the submission deadline.",
      time: "3 days ago",
    },

    {
      id: 5,
      type: "success",
      icon: CheckCircle,
      title: "Good Progress",
      message:
        "Your attendance has improved compared with the previous week. Keep maintaining your progress.",
      time: "5 days ago",
    },
  ];

  return (
    <div className="student-notifications-page">

      {/* Header */}

      <header className="notifications-header">

        <button
          className="notifications-back-button"
          onClick={() => navigate("/student")}
        >
          <ArrowLeft size={19} />
          Back to Dashboard
        </button>

        <div className="notifications-title">

          <div className="notifications-title-icon">
            <Bell size={27} />
          </div>

          <div>
            <h1>Notifications</h1>

            <p>
              {student.name} • {student.rollNumber}
            </p>
          </div>

        </div>

      </header>


      {/* Main Content */}

      <main className="notifications-content">

        {/* Summary */}

        <section className="notification-summary">

          <div>
            <span>Total Notifications</span>
            <strong>{notifications.length}</strong>
          </div>

          <div>
            <span>Important Alerts</span>
            <strong>1</strong>
          </div>

          <div>
            <span>AI Updates</span>
            <strong>1</strong>
          </div>

        </section>


        {/* Notification List */}

        <section className="notification-list-card">

          <div className="notification-list-heading">

            <div>
              <h2>Recent Notifications</h2>

              <p>
                Stay updated with your academic activities
              </p>
            </div>

            <Bell size={23} />

          </div>


          <div className="notification-list">

            {notifications.map((notification) => {

              const Icon = notification.icon;

              return (
                <div
                  className={`notification-item ${notification.type}`}
                  key={notification.id}
                >

                  <div className="notification-icon">
                    <Icon size={21} />
                  </div>

                  <div className="notification-details">

                    <div className="notification-top">

                      <h3>
                        {notification.title}
                      </h3>

                      <span>
                        {notification.time}
                      </span>

                    </div>

                    <p>
                      {notification.message}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </section>


        {/* Intervention */}

        <section className="intervention-card">

          <div className="intervention-icon">
            <Brain size={25} />
          </div>

          <div>

            <h2>AI Recommended Action</h2>

            <p>
              Based on your current attendance and
              engagement, continue maintaining regular
              attendance and complete your academic
              activities on time.
            </p>

            <button
              onClick={() =>
                navigate("/student/ai-insights")
              }
            >
              View AI Insights
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default StudentNotifications;