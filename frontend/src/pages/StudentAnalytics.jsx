import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  CalendarCheck,
  Brain,
} from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";

import "./StudentAnalytics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function StudentAnalytics() {
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
      <div className="analytics-loading">
        Loading analytics...
      </div>
    );
  }

  // Attendance trend
  const attendanceData = {
    labels: [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
    ],

    datasets: [
      {
        label: "Attendance %",
        data: [72, 75, 78, 80, 81, 82],
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };

  // Engagement data
  const engagementData = {
    labels: [
      "Assignments",
      "Class Participation",
      "Quizzes",
      "Activities",
      "Attendance",
    ],

    datasets: [
      {
        label: "Engagement Score",
        data: [82, 75, 68, 80, 82],
        borderWidth: 2,
      },
    ],
  };

  const attendanceOptions = {
    responsive: true,

    plugins: {
      legend: {
        display: true,
      },
    },

    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  const engagementOptions = {
    responsive: true,

    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div className="student-analytics-page">

      {/* Header */}

      <header className="student-analytics-header">

        <button
          className="analytics-back-button"
          onClick={() => navigate("/student")}
        >
          <ArrowLeft size={19} />
          Back to Dashboard
        </button>

        <div className="analytics-title">

          <div className="analytics-title-icon">
            <BarChart3 size={27} />
          </div>

          <div>
            <h1>My Analytics</h1>

            <p>
              {student.name} • {student.rollNumber}
            </p>
          </div>

        </div>

      </header>


      {/* Main */}

      <main className="student-analytics-content">

        {/* Summary Cards */}

        <section className="analytics-summary">

          <div className="analytics-card">

            <div className="analytics-card-icon attendance">
              <CalendarCheck size={23} />
            </div>

            <div>
              <span>Attendance</span>
              <h2>82%</h2>
              <small>↑ 5% this month</small>
            </div>

          </div>


          <div className="analytics-card">

            <div className="analytics-card-icon engagement">
              <TrendingUp size={23} />
            </div>

            <div>
              <span>Engagement</span>
              <h2>74</h2>
              <small>Above average</small>
            </div>

          </div>


          <div className="analytics-card">

            <div className="analytics-card-icon performance">
              <Brain size={23} />
            </div>

            <div>
              <span>AI Performance</span>
              <h2>Good</h2>
              <small>Positive trend</small>
            </div>

          </div>

        </section>


        {/* Attendance Chart */}

        <section className="analytics-panel">

          <div className="analytics-panel-heading">

            <div>
              <h2>Attendance Trend</h2>

              <p>
                Your attendance performance over the last six weeks
              </p>
            </div>

            <CalendarCheck size={23} />

          </div>

          <div className="chart-container">
            <Line
              data={attendanceData}
              options={attendanceOptions}
            />
          </div>

        </section>


        {/* Engagement Chart */}

        <section className="analytics-panel">

          <div className="analytics-panel-heading">

            <div>
              <h2>Engagement Analysis</h2>

              <p>
                Your participation and academic engagement
              </p>
            </div>

            <TrendingUp size={23} />

          </div>

          <div className="chart-container">
            <Bar
              data={engagementData}
              options={engagementOptions}
            />
          </div>

        </section>


        {/* AI Analysis */}

        <section className="student-ai-analysis">

          <div className="student-ai-icon">
            <Brain size={26} />
          </div>

          <div>

            <h2>AI Performance Insight</h2>

            <p>
              Your attendance has improved consistently over
              the last six weeks. Your current engagement score
              is also above average.
            </p>

            <div className="ai-analysis-points">

              <span>✓ Attendance improving</span>

              <span>✓ Engagement is healthy</span>

              <span>✓ Low academic risk</span>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default StudentAnalytics;