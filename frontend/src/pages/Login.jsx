import { useState } from "react";
import { Brain, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo login
    if (email === "faculty@test.com") {
      navigate("/faculty");
    } else if (email === "student@test.com") {
      navigate("/student");
    } else {
      alert("Demo login:\n\nfaculty@test.com\nstudent@test.com");
    }
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}

      <div className="login-left">

        <div className="login-brand">
          <div className="brand-icon">
            <Brain size={23} />
          </div>

          <span>AttendAI</span>
        </div>

        <div className="login-content">

          <div className="login-badge">
            <Sparkles size={15} />
            AI-Powered Student Success
          </div>

          <h1>
            Smarter insights.
            <br />
            <span>Better outcomes.</span>
          </h1>

          <p>
            Transform attendance and academic data into
            meaningful insights that help every student succeed.
          </p>

          <div className="login-features">

            <div>
              <span>01</span>
              <p>AI Early Warning</p>
            </div>

            <div>
              <span>02</span>
              <p>Engagement Analytics</p>
            </div>

            <div>
              <span>03</span>
              <p>Personalized Intervention</p>
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="login-right">

        <div className="login-card">

          <div className="mobile-logo">
            <div className="brand-icon">
              <Brain size={20} />
            </div>

            <span>AttendAI</span>
          </div>

          <h2>Welcome back 👋</h2>

          <p className="login-subtitle">
            Sign in to your dashboard
          </p>

          <form onSubmit={handleLogin}>

            <div className="form-group">

              <label>Email address</label>

              <input
                type="email"
                placeholder="you@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>

            <div className="form-group">

              <label>Password</label>

              <div className="password-input">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            <div className="login-options">

              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#forgot">
                Forgot password?
              </a>

            </div>

            <button className="login-button" type="submit">

              Sign in

              <ArrowRight size={18} />

            </button>

          </form>

          {/* DEMO LOGIN */}

          <div className="demo-login">

            <p>Hackathon Demo</p>

            <div className="demo-buttons">

              <button
                onClick={() => {
                  setEmail("faculty@test.com");
                  setPassword("123456");
                }}
              >
                Faculty Demo
              </button>

              <button
                onClick={() => {
                  setEmail("student@test.com");
                  setPassword("123456");
                }}
              >
                Student Demo
              </button>

            </div>

          </div>

          <div className="login-footer">
            AI-Based College Attendance & Student Engagement Platform
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;