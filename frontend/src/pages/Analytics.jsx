import { useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Brain,
  TrendingUp,
  TrendingDown,
  Users,
  ClipboardCheck,
  AlertTriangle,
  CheckCircle2,
  CalendarDays,
  Sparkles,
  ArrowUpRight
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";

import "./Analytics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler
);

function Analytics() {

  const navigate = useNavigate();

  const [period, setPeriod] = useState("This Week");

  /* ================= ATTENDANCE DATA ================= */

  const attendanceData = {
    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],

    datasets: [
      {
        label: "Attendance %",
        data: [82, 85, 83, 89, 86],
        borderWidth: 3,
        tension: 0.4,
        fill: true
      }
    ]
  };


  /* ================= ENGAGEMENT DATA ================= */

  const engagementData = {
    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ],

    datasets: [
      {
        label: "Engagement Score",
        data: [68, 71, 73, 77, 75],
        borderWidth: 3,
        tension: 0.4,
        fill: true
      }
    ]
  };


  /* ================= DEPARTMENT DATA ================= */

  const departmentData = {
    labels: [
      "CSE",
      "IT",
      "ECE",
      "AIML"
    ],

    datasets: [
      {
        label: "Attendance %",
        data: [86, 82, 79, 91],
        borderWidth: 1
      }
    ]
  };


  const lineOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false
      }
    },

    scales: {
      y: {
        min: 0,
        max: 100,

        ticks: {
          font: {
            size: 10
          }
        },

        grid: {
          color: "#eef0f4"
        }
      },

      x: {
        grid: {
          display: false
        },

        ticks: {
          font: {
            size: 10
          }
        }
      }
    }
  };


  const barOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false
      }
    },

    scales: {
      y: {
        min: 0,
        max: 100,

        ticks: {
          font: {
            size: 10
          }
        },

        grid: {
          color: "#eef0f4"
        }
      },

      x: {
        grid: {
          display: false
        },

        ticks: {
          font: {
            size: 10
          }
        }
      }
    }
  };


  return (

    <div className="analytics-page">

      {/* ================= HEADER ================= */}

      <header className="analytics-header">

        <button
          className="analytics-back"
          onClick={() => navigate("/faculty")}
        >
          <ArrowLeft size={17} />
          Dashboard
        </button>


        <div className="analytics-brand">

          <div className="analytics-brand-icon">
            <BarChart3 size={19} />
          </div>

          <strong>
            Faculty Analytics
          </strong>

        </div>


        <div className="analytics-period">

          <CalendarDays size={14} />

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >

            <option>
              This Week
            </option>

            <option>
              This Month
            </option>

            <option>
              This Semester
            </option>

          </select>

        </div>

      </header>


      <main className="analytics-container">


        {/* ================= TITLE ================= */}

        <section className="analytics-title">

          <div>

            <p>
              PERFORMANCE INTELLIGENCE
            </p>

            <h1>
              Student Analytics
            </h1>

            <span>
              Monitor attendance, engagement and
              student risk using AI-powered insights.
            </span>

          </div>

        </section>


        {/* ================= KPI CARDS ================= */}

        <section className="analytics-stats">


          {/* STUDENTS */}

          <div className="analytics-stat-card">

            <div className="analytics-stat-top">

              <div className="analytics-icon purple">
                <Users size={18} />
              </div>

              <span className="analytics-positive">
                <TrendingUp size={12} />
                8.2%
              </span>

            </div>

            <span className="analytics-label">
              Total Students
            </span>

            <strong>
              120
            </strong>

            <small>
              Across 4 departments
            </small>

          </div>


          {/* ATTENDANCE */}

          <div className="analytics-stat-card">

            <div className="analytics-stat-top">

              <div className="analytics-icon green">
                <ClipboardCheck size={18} />
              </div>

              <span className="analytics-positive">
                <TrendingUp size={12} />
                3.4%
              </span>

            </div>

            <span className="analytics-label">
              Average Attendance
            </span>

            <strong>
              86.4%
            </strong>

            <small>
              Compared with last week
            </small>

          </div>


          {/* ENGAGEMENT */}

          <div className="analytics-stat-card">

            <div className="analytics-stat-top">

              <div className="analytics-icon orange">
                <Brain size={18} />
              </div>

              <span className="analytics-positive">
                <TrendingUp size={12} />
                5.7%
              </span>

            </div>

            <span className="analytics-label">
              Engagement Score
            </span>

            <strong>
              74.8
            </strong>

            <small>
              University average
            </small>

          </div>


          {/* RISK */}

          <div className="analytics-stat-card">

            <div className="analytics-stat-top">

              <div className="analytics-icon red">
                <AlertTriangle size={18} />
              </div>

              <span className="analytics-negative">
                <TrendingDown size={12} />
                2.1%
              </span>

            </div>

            <span className="analytics-label">
              Students At Risk
            </span>

            <strong>
              12
            </strong>

            <small>
              5 high-risk students
            </small>

          </div>

        </section>


        {/* ================= CHART ROW ================= */}

        <section className="analytics-chart-grid">


          {/* ATTENDANCE */}

          <div className="analytics-card">

            <div className="analytics-card-header">

              <div>

                <h2>
                  Attendance Trend
                </h2>

                <p>
                  Weekly attendance performance
                </p>

              </div>

              <span className="chart-value green-text">
                86.4%
              </span>

            </div>


            <div className="chart-container">

              <Line
                data={attendanceData}
                options={lineOptions}
              />

            </div>

          </div>


          {/* ENGAGEMENT */}

          <div className="analytics-card">

            <div className="analytics-card-header">

              <div>

                <h2>
                  Engagement Trend
                </h2>

                <p>
                  Student engagement this week
                </p>

              </div>

              <span className="chart-value purple-text">
                74.8
              </span>

            </div>


            <div className="chart-container">

              <Line
                data={engagementData}
                options={lineOptions}
              />

            </div>

          </div>

        </section>


        {/* ================= DEPARTMENT + INSIGHTS ================= */}

        <section className="analytics-bottom-grid">


          {/* DEPARTMENT */}

          <div className="analytics-card department-card">

            <div className="analytics-card-header">

              <div>

                <h2>
                  Department Performance
                </h2>

                <p>
                  Attendance comparison
                </p>

              </div>

              <BarChart3 size={17} />

            </div>


            <div className="department-chart">

              <Bar
                data={departmentData}
                options={barOptions}
              />

            </div>

          </div>


          {/* AI INSIGHTS */}

          <div className="analytics-ai-card">

            <div className="analytics-ai-header">

              <div className="analytics-ai-icon">
                <Sparkles size={17} />
              </div>

              <div>

                <h2>
                  AI Insights
                </h2>

                <p>
                  Automatically detected patterns
                </p>

              </div>

            </div>


            <div className="ai-insight critical">

              <AlertTriangle size={16} />

              <div>

                <strong>
                  Critical Attention
                </strong>

                <p>
                  5 students have attendance below
                  65% and require immediate support.
                </p>

              </div>

            </div>


            <div className="ai-insight warning">

              <TrendingDown size={16} />

              <div>

                <strong>
                  Engagement Decline
                </strong>

                <p>
                  CSE engagement decreased by 12%
                  over the last two weeks.
                </p>

              </div>

            </div>


            <div className="ai-insight success">

              <CheckCircle2 size={16} />

              <div>

                <strong>
                  Positive Improvement
                </strong>

                <p>
                  AIML attendance improved by 8.4%
                  this week.
                </p>

              </div>

            </div>


            <button
              className="risk-analysis-button"
              onClick={() => navigate("/risk-monitor")}
            >
              Open AI Risk Monitor
              <ArrowUpRight size={15} />
            </button>

          </div>

        </section>


        {/* ================= AI RECOMMENDATION ================= */}

        <section className="recommendation-card">

          <div className="recommendation-icon">
            <Brain size={20} />
          </div>


          <div className="recommendation-content">

            <p>
              AI RECOMMENDATION
            </p>

            <h2>
              Focus on students showing early warning signs
            </h2>

            <span>
              Based on attendance and engagement patterns,
              the AI recommends prioritizing five high-risk
              students for faculty intervention this week.
            </span>

          </div>


          <button
            onClick={() => navigate("/risk-monitor")}
          >
            View Students
            <ArrowUpRight size={15} />
          </button>

        </section>

      </main>

    </div>

  );
}

export default Analytics;