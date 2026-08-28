import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import "./MyAttendance.css";

function MyAttendance() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  const subjects = [
    {
      name: "Database Management Systems",
      code: "CS301",
      total: 40,
      present: 36,
      absent: 4,
    },
    {
      name: "Artificial Intelligence",
      code: "CS302",
      total: 40,
      present: 33,
      absent: 7,
    },
    {
      name: "Web Technology",
      code: "CS303",
      total: 40,
      present: 30,
      absent: 10,
    },
    {
      name: "Operating Systems",
      code: "CS304",
      total: 40,
      present: 37,
      absent: 3,
    },
    {
      name: "Computer Networks",
      code: "CS305",
      total: 40,
      present: 35,
      absent: 5,
    },
  ];

  useEffect(() => {
    const savedStudent = localStorage.getItem("student");

    if (!savedStudent) {
      navigate("/student-login");
      return;
    }

    setStudent(JSON.parse(savedStudent));
  }, [navigate]);

  const getPercentage = (present, total) => {
    return Math.round((present / total) * 100);
  };

  const totalClasses = subjects.reduce(
    (sum, subject) => sum + subject.total,
    0
  );

  const totalPresent = subjects.reduce(
    (sum, subject) => sum + subject.present,
    0
  );

  const totalAbsent = subjects.reduce(
    (sum, subject) => sum + subject.absent,
    0
  );

  const overallPercentage = Math.round(
    (totalPresent / totalClasses) * 100
  );

  if (!student) {
    return <div className="attendance-loading">Loading...</div>;
  }

  return (
    <div className="my-attendance-page">

      {/* Header */}
      <header className="attendance-header">

        <button
          className="back-button"
          onClick={() => navigate("/student")}
        >
          <ArrowLeft size={19} />
          Back to Dashboard
        </button>

        <div className="attendance-title">
          <div className="attendance-title-icon">
            <CalendarCheck size={28} />
          </div>

          <div>
            <h1>My Attendance</h1>
            <p>
              {student.name} • {student.rollNumber}
            </p>
          </div>
        </div>

      </header>

      <main className="attendance-content">

        {/* Overview */}
        <section className="attendance-overview">

          <div className="overall-card">
            <div className="attendance-circle">
              <span>{overallPercentage}%</span>
            </div>

            <div>
              <p>Overall Attendance</p>

              <h2>
                {overallPercentage >= 75
                  ? "Good Attendance"
                  : "Attendance Needs Improvement"}
              </h2>

              <small>
                Minimum required attendance: 75%
              </small>
            </div>
          </div>

          <div className="attendance-stat">
            <div className="stat-symbol present">
              <CheckCircle size={23} />
            </div>

            <div>
              <span>Present</span>
              <strong>{totalPresent}</strong>
              <small>Classes</small>
            </div>
          </div>

          <div className="attendance-stat">
            <div className="stat-symbol absent">
              <XCircle size={23} />
            </div>

            <div>
              <span>Absent</span>
              <strong>{totalAbsent}</strong>
              <small>Classes</small>
            </div>
          </div>

        </section>

        {/* Subject Attendance */}
        <section className="attendance-table-card">

          <div className="section-heading">
            <div>
              <h2>Subject-wise Attendance</h2>
              <p>View your attendance for each subject</p>
            </div>

            <CalendarCheck size={23} />
          </div>

          <div className="attendance-table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Total Classes</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Attendance</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {subjects.map((subject) => {
                  const percentage = getPercentage(
                    subject.present,
                    subject.total
                  );

                  return (
                    <tr key={subject.code}>

                      <td>
                        <div className="subject-name">
                          <strong>{subject.name}</strong>
                          <span>{subject.code}</span>
                        </div>
                      </td>

                      <td>{subject.total}</td>

                      <td className="present-number">
                        {subject.present}
                      </td>

                      <td className="absent-number">
                        {subject.absent}
                      </td>

                      <td>
                        <div className="percentage-container">

                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{
                                width: `${percentage}%`,
                              }}
                            ></div>
                          </div>

                          <strong>{percentage}%</strong>

                        </div>
                      </td>

                      <td>
                        {percentage >= 75 ? (
                          <span className="status good">
                            <CheckCircle size={15} />
                            Good
                          </span>
                        ) : (
                          <span className="status warning">
                            <AlertTriangle size={15} />
                            Low
                          </span>
                        )}
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </section>

        {/* AI Attendance Insight */}
        <section className="attendance-ai-card">

          <div className="ai-icon">
            <CalendarCheck size={25} />
          </div>

          <div>

            <h2>AI Attendance Insight</h2>

            <p>
              Your current overall attendance is{" "}
              <strong>{overallPercentage}%</strong>.
              {overallPercentage >= 75
                ? " Your attendance is above the minimum requirement. Continue maintaining regular attendance."
                : " Your attendance is below the recommended level. Try to attend upcoming classes regularly."}
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default MyAttendance;