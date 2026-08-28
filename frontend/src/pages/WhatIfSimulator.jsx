import { useState } from "react";
import {
  ArrowLeft,
  Brain,
  Sparkles,
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./WhatIfSimulator.css";

function WhatIfSimulator() {

  const navigate = useNavigate();

  const [attendance, setAttendance] = useState(62);
  const [engagement, setEngagement] = useState(48);
  const [assignments, setAssignments] = useState(55);

  /*
    Demo AI scoring logic.

    Later your teammate can replace this
    with the real backend AI model.
  */

  const riskScore = Math.max(
    5,
    Math.min(
      95,
      Math.round(
        100 -
        (
          attendance * 0.45 +
          engagement * 0.30 +
          assignments * 0.25
        )
      )
    )
  );

  const getRiskLevel = () => {

    if (riskScore >= 70) {
      return "High";
    }

    if (riskScore >= 40) {
      return "Medium";
    }

    return "Low";
  };

  const riskLevel = getRiskLevel();

  const getRiskClass = () => {

    if (riskLevel === "High") return "high";

    if (riskLevel === "Medium") return "medium";

    return "low";
  };

  const resetSimulation = () => {

    setAttendance(62);
    setEngagement(48);
    setAssignments(55);

  };

  const currentRisk = 82;

  const riskReduction = Math.max(
    0,
    currentRisk - riskScore
  );

  return (

    <div className="simulator-page">

      {/* HEADER */}

      <header className="simulator-header">

        <button
          className="sim-back"
          onClick={() => navigate("/faculty")}
        >
          <ArrowLeft size={17} />
          Dashboard
        </button>

        <div className="sim-brand">

          <div className="sim-brand-icon">
            <Brain size={19} />
          </div>

          <strong>
            AI What-If Simulator
          </strong>

        </div>

        <div className="simulation-status">

          <span></span>

          Simulation Mode

        </div>

      </header>


      <main className="simulator-container">

        {/* TITLE */}

        <section className="sim-title">

          <div>

            <p>
              AI PREDICTIVE ANALYSIS
            </p>

            <h1>
              What happens if we improve?
            </h1>

            <span>
              Simulate different interventions and see how
              student risk could change.
            </span>

          </div>

          <button
            className="reset-btn"
            onClick={resetSimulation}
          >
            <RotateCcw size={15} />
            Reset
          </button>

        </section>


        {/* STUDENT */}

        <section className="sim-student">

          <div className="sim-avatar">
            A
          </div>

          <div>

            <strong>
              Arun Kumar
            </strong>

            <small>
              Computer Science Engineering • 3rd Year
            </small>

          </div>

          <span className="current-risk">
            Current Risk: <b>82%</b>
          </span>

        </section>


        {/* MAIN GRID */}

        <section className="sim-grid">

          {/* CONTROLS */}

          <div className="controls-card">

            <div className="card-heading">

              <div className="heading-icon">
                <Sparkles size={17} />
              </div>

              <div>

                <h2>
                  Intervention Controls
                </h2>

                <p>
                  Adjust student factors
                </p>

              </div>

            </div>


            {/* ATTENDANCE */}

            <div className="control">

              <div className="control-top">

                <label>
                  Attendance
                </label>

                <strong>
                  {attendance}%
                </strong>

              </div>

              <input
                type="range"
                min="40"
                max="100"
                value={attendance}
                onChange={(e) =>
                  setAttendance(Number(e.target.value))
                }
              />

              <div className="range-labels">

                <span>40%</span>

                <span>100%</span>

              </div>

            </div>


            {/* ENGAGEMENT */}

            <div className="control">

              <div className="control-top">

                <label>
                  Engagement Score
                </label>

                <strong>
                  {engagement}
                </strong>

              </div>

              <input
                type="range"
                min="20"
                max="100"
                value={engagement}
                onChange={(e) =>
                  setEngagement(Number(e.target.value))
                }
              />

              <div className="range-labels">

                <span>20</span>

                <span>100</span>

              </div>

            </div>


            {/* ASSIGNMENTS */}

            <div className="control">

              <div className="control-top">

                <label>
                  Assignment Completion
                </label>

                <strong>
                  {assignments}%
                </strong>

              </div>

              <input
                type="range"
                min="20"
                max="100"
                value={assignments}
                onChange={(e) =>
                  setAssignments(Number(e.target.value))
                }
              />

              <div className="range-labels">

                <span>20%</span>

                <span>100%</span>

              </div>

            </div>


            {/* QUICK ACTIONS */}

            <div className="quick-actions">

              <p>
                QUICK INTERVENTIONS
              </p>

              <button
                onClick={() => setAttendance(
                  Math.min(100, attendance + 10)
                )}
              >
                <TrendingUp size={15} />
                Improve Attendance +10%
              </button>

              <button
                onClick={() => setEngagement(
                  Math.min(100, engagement + 15)
                )}
              >
                <Brain size={15} />
                Boost Engagement +15
              </button>

              <button
                onClick={() => setAssignments(
                  Math.min(100, assignments + 20)
                )}
              >
                <CheckCircle2 size={15} />
                Complete Assignments +20%
              </button>

            </div>

          </div>


          {/* RESULT */}

          <div className="prediction-card">

            <div className="prediction-heading">

              <div>

                <p>
                  AI PREDICTION
                </p>

                <h2>
                  Predicted Student Risk
                </h2>

              </div>

              <Brain size={23} />

            </div>


            <div className="prediction-circle">

              <div>

                <strong>
                  {riskScore}
                </strong>

                <span>
                  /100
                </span>

              </div>

            </div>


            <div className={`prediction-badge ${getRiskClass()}`}>

              {riskLevel.toUpperCase()} RISK

            </div>


            <p className="prediction-text">

              {riskLevel === "High" &&
                "The student still requires immediate intervention."
              }

              {riskLevel === "Medium" &&
                "The student's risk is improving, but continued monitoring is recommended."
              }

              {riskLevel === "Low" &&
                "The student is showing a healthy academic profile."
              }

            </p>


            {/* COMPARISON */}

            <div className="comparison">

              <div>

                <span>
                  Current Risk
                </span>

                <strong>
                  82%
                </strong>

              </div>

              <div className="arrow">
                →
              </div>

              <div>

                <span>
                  Predicted Risk
                </span>

                <strong className={getRiskClass()}>
                  {riskScore}%
                </strong>

              </div>

            </div>


            {/* IMPROVEMENT */}

            <div className="improvement">

              {riskReduction > 0 ? (
                <>
                  <TrendingDown size={19} />

                  <div>

                    <strong>
                      Risk reduced by {riskReduction}%
                    </strong>

                    <p>
                      This intervention could significantly
                      improve the student's academic outcome.
                    </p>

                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle size={19} />

                  <div>

                    <strong>
                      More intervention required
                    </strong>

                    <p>
                      Increase attendance, engagement or
                      assignment completion.
                    </p>

                  </div>
                </>
              )}

            </div>


            {/* AI INSIGHT */}

            <div className="ai-insight">

              <Sparkles size={17} />

              <div>

                <strong>
                  AI Insight
                </strong>

                <p>

                  Based on the simulated values, improving
                  attendance and engagement has the strongest
                  impact on reducing student risk.

                </p>

              </div>

            </div>

          </div>

        </section>


        {/* FOOTER MESSAGE */}

        <div className="sim-footer">

          <Sparkles size={16} />

          <span>
            This is a predictive simulation. Final decisions
            should be made by faculty based on student context.
          </span>

        </div>

      </main>

    </div>
  );
}

export default WhatIfSimulator;