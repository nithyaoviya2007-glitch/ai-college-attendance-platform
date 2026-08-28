import { ArrowRight, Brain, BarChart3, ShieldCheck, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">
            <Brain size={22} />
          </div>
          <span>AttendAI</span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <button onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <div className="badge">
            <Sparkles size={16} />
            AI-Powered Student Success Platform
          </div>

          <h1>
            Predict.
            <span> Understand.</span>
            <br />
            Improve.
          </h1>

          <p>
            An intelligent college attendance and student engagement
            platform that identifies at-risk students and provides
            personalized AI-driven interventions.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/login")}
            >
              Explore Platform
              <ArrowRight size={19} />
            </button>

            <button className="secondary-btn">
              Watch Demo
            </button>
          </div>

          <div className="trust-text">
            Built for smarter student success
          </div>

        </div>

        {/* DASHBOARD PREVIEW */}
        <div className="dashboard-preview">

          <div className="preview-header">
            <div>
              <small>Student Engagement</small>
              <h3>AI Overview</h3>
            </div>

            <div className="status">
              ● Live
            </div>
          </div>

          <div className="preview-stats">

            <div className="mini-card">
              <span>Students</span>
              <strong>120</strong>
              <small>+8.2%</small>
            </div>

            <div className="mini-card">
              <span>Attendance</span>
              <strong>86.4%</strong>
              <small>+3.4%</small>
            </div>

            <div className="mini-card danger">
              <span>At Risk</span>
              <strong>12</strong>
              <small>Needs attention</small>
            </div>

          </div>

          <div className="chart-card">

            <div className="chart-title">
              <span>Engagement Trend</span>
              <span>Last 6 months</span>
            </div>

            <div className="fake-chart">
              <div className="line"></div>
            </div>

          </div>

          <div className="ai-preview">

            <div className="ai-icon">
              <Sparkles size={20} />
            </div>

            <div>
              <strong>AI Early Warning</strong>
              <p>
                5 students require immediate attention.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="features" id="features">

        <div className="section-title">
          <span>POWERED BY INTELLIGENCE</span>
          <h2>Everything you need to improve student success</h2>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">
              <Brain />
            </div>

            <h3>AI Early Warning</h3>

            <p>
              Identify students who may be at risk before
              academic problems become serious.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <BarChart3 />
            </div>

            <h3>Engagement Analytics</h3>

            <p>
              Understand attendance, academic performance
              and student participation through intelligent analytics.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <ShieldCheck />
            </div>

            <h3>Smart Intervention</h3>

            <p>
              Generate personalized action plans to help
              students improve their academic performance.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="cta">

        <h2>
          Turn attendance data into
          <span> student success.</span>
        </h2>

        <p>
          Discover the power of AI-driven academic intelligence.
        </p>

        <button
          className="primary-btn"
          onClick={() => navigate("/login")}
        >
          Get Started
          <ArrowRight size={18} />
        </button>

      </section>

      {/* FOOTER */}
      <footer>
        <div className="logo">
          <div className="logo-icon">
            <Brain size={20} />
          </div>
          AttendAI
        </div>

        <p>
          AI-Based College Attendance & Student Engagement Platform
        </p>
      </footer>

    </div>
  );
}

export default Landing;