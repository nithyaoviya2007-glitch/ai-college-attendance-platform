import { useState } from "react";

import {
  Brain,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  User,
  GraduationCap,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("signin");
  const [role, setRole] = useState("student");

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerNumber, setRegisterNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5000/api/auth";

  // ========================================
  // CLEAR
  // ========================================

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  // ========================================
  // SIGN IN / SIGN UP
  // ========================================

  const handleModeChange = (newMode) => {
    setMode(newMode);
    clearMessages();
  };

  // ========================================
  // ROLE
  // ========================================

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    clearMessages();

    if (newRole === "faculty") {
      setRegisterNumber("");
      setYear("");
      setSection("");
    }
  };

  // ========================================
  // SAVE USER
  // ========================================

  const saveUserData = (user, token) => {
    console.log("LOGGED IN USER:", user);

    // Save JWT
    localStorage.setItem("token", token);

    // Save complete user
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    // Remove old role data
    localStorage.removeItem("student");
    localStorage.removeItem("faculty");

    // Student
    if (user.role === "student") {
      const studentData = {
        id: user.id,
        name: user.name,
        email: user.email,

        rollNumber: user.registerNumber,
        registerNumber: user.registerNumber,

        department: user.department,

        year: user.year,

        section: user.section,
      };

      console.log(
        "SAVING STUDENT DATA:",
        studentData
      );

      localStorage.setItem(
        "student",
        JSON.stringify(studentData)
      );
    }

    // Faculty
    if (user.role === "faculty") {
      const facultyData = {
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department,
      };

      localStorage.setItem(
        "faculty",
        JSON.stringify(facultyData)
      );
    }
  };

  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    clearMessages();
    setLoading(true);

    try {
      // ========================================
      // BASIC VALIDATION
      // ========================================

      if (!email || !password) {
        throw new Error(
          "Please enter email and password."
        );
      }

      // ========================================
      // SIGNUP VALIDATION
      // ========================================

      if (mode === "signup") {
        if (!name.trim()) {
          throw new Error(
            "Please enter your name."
          );
        }

        if (role === "student") {
          if (!registerNumber.trim()) {
            throw new Error(
              "Please enter register number."
            );
          }

          if (!year) {
            throw new Error(
              "Please select year."
            );
          }

          if (!section) {
            throw new Error(
              "Please select section."
            );
          }
        }

        if (!department) {
          throw new Error(
            "Please select department."
          );
        }

        if (password.length < 6) {
          throw new Error(
            "Password must contain at least 6 characters."
          );
        }
      }

      // ========================================
      // SIGNUP
      // ========================================

      if (mode === "signup") {
        const signupData = {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          role,
          department,
        };

        if (role === "student") {
          signupData.registerNumber =
            registerNumber.trim();

          signupData.year = Number(year);

          signupData.section = section;
        }

        console.log(
          "SIGNUP DATA:",
          signupData
        );

        const response = await fetch(
          `${API_URL}/signup`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(signupData),
          }
        );

        const data = await response.json();

        console.log(
          "SIGNUP RESPONSE:",
          data
        );

        if (!response.ok) {
          throw new Error(
            data.message || "Signup failed"
          );
        }

        // Save actual database user
        saveUserData(
          data.user,
          data.token
        );

        setSuccess(
          "Account created successfully!"
        );

        setTimeout(() => {
          if (data.user.role === "student") {
            navigate("/student");
          } else {
            navigate("/faculty");
          }
        }, 500);

        return;
      }

      // ========================================
      // SIGN IN
      // ========================================

      const loginData = {
        email: email.trim().toLowerCase(),
        password,
        role,
      };

      console.log(
        "LOGIN DATA:",
        loginData
      );

      const response = await fetch(
        `${API_URL}/signin`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      console.log(
        "LOGIN RESPONSE:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      // IMPORTANT
      // Save THIS logged-in user's data
      saveUserData(
        data.user,
        data.token
      );

      setSuccess(
        "Login successful!"
      );

      setTimeout(() => {
        if (data.user.role === "student") {
          navigate("/student");
        } else {
          navigate("/faculty");
        }
      }, 500);

    } catch (error) {
      console.error(
        "AUTH ERROR:",
        error
      );

      setError(
        error.message ||
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // UI
  // ========================================

  return (
    <div className="login-page">

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
            Transform attendance and academic data
            into meaningful insights that help every
            student succeed.
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

      <div className="login-right">

        <div className="login-card">

          <div className="mobile-logo">
            <div className="brand-icon">
              <Brain size={20} />
            </div>

            <span>AttendAI</span>
          </div>

          <h2>
            {mode === "signin"
              ? "Welcome back 👋"
              : "Create your account"}
          </h2>

          <p className="login-subtitle">
            {mode === "signin"
              ? "Sign in to your dashboard"
              : "Join the AttendAI platform"}
          </p>

          {/* SIGN IN / SIGN UP */}

          <div className="auth-tabs">

            <button
              type="button"
              className={
                mode === "signin"
                  ? "auth-tab active"
                  : "auth-tab"
              }
              onClick={() =>
                handleModeChange("signin")
              }
            >
              Sign In
            </button>

            <button
              type="button"
              className={
                mode === "signup"
                  ? "auth-tab active"
                  : "auth-tab"
              }
              onClick={() =>
                handleModeChange("signup")
              }
            >
              Sign Up
            </button>

          </div>

          {/* STUDENT / FACULTY */}

          <div className="role-tabs">

            <button
              type="button"
              className={
                role === "student"
                  ? "role-tab active"
                  : "role-tab"
              }
              onClick={() =>
                handleRoleChange("student")
              }
            >
              <GraduationCap size={18} />
              Student
            </button>

            <button
              type="button"
              className={
                role === "faculty"
                  ? "role-tab active"
                  : "role-tab"
              }
              onClick={() =>
                handleRoleChange("faculty")
              }
            >
              <User size={18} />
              Faculty
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            {mode === "signup" && (
              <div className="form-group">

                <label>Full Name</label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />

              </div>
            )}

            {/* EMAIL */}

            <div className="form-group">

              <label>Email address</label>

              <input
                type="email"
                placeholder="you@college.edu"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="form-group">

              <label>Password</label>

              <div className="password-input">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
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

            {/* STUDENT SIGNUP */}

            {mode === "signup" &&
              role === "student" && (
                <>
                  <div className="form-group">

                    <label>
                      Register Number
                    </label>

                    <input
                      type="text"
                      placeholder="CS23A001"
                      value={registerNumber}
                      onChange={(e) =>
                        setRegisterNumber(
                          e.target.value
                        )
                      }
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label>Year</label>

                    <select
                      value={year}
                      onChange={(e) =>
                        setYear(e.target.value)
                      }
                      required
                    >
                      <option value="">
                        Select Year
                      </option>

                      <option value="1">
                        1st Year
                      </option>

                      <option value="2">
                        2nd Year
                      </option>

                      <option value="3">
                        3rd Year
                      </option>

                      <option value="4">
                        4th Year
                      </option>
                    </select>

                  </div>

                  {/* SECTION */}

                  <div className="form-group">

                    <label>Section</label>

                    <select
                      value={section}
                      onChange={(e) =>
                        setSection(e.target.value)
                      }
                      required
                    >

                      <option value="">
                        Select Section
                      </option>

                      <option value="A">
                        Section A
                      </option>

                      <option value="B">
                        Section B
                      </option>

                      <option value="C">
                        Section C
                      </option>

                      <option value="D">
                        Section D
                      </option>

                    </select>

                  </div>

                </>
              )}

            {/* DEPARTMENT */}

            {mode === "signup" && (
              <div className="form-group">

                <label>Department</label>

                <select
                  value={department}
                  onChange={(e) =>
                    setDepartment(e.target.value)
                  }
                  required
                >

                  <option value="">
                    Select Department
                  </option>

                  <option value="Computer Science">
                    Computer Science
                  </option>

                  <option value="Information Technology">
                    Information Technology
                  </option>

                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>

                  <option value="Electronics and Communication">
                    Electronics and Communication
                  </option>

                  <option value="Electrical and Electronics">
                    Electrical and Electronics
                  </option>

                </select>

              </div>
            )}

            {/* SIGN IN OPTIONS */}

            {mode === "signin" && (
              <div className="login-options">

                <label>
                  <input type="checkbox" />
                  Remember me
                </label>

                <a
                  href="#forgot"
                  onClick={(e) =>
                    e.preventDefault()
                  }
                >
                  Forgot password?
                </a>

              </div>
            )}

            {/* ERROR */}

            {error && (
              <p
                style={{
                  color: "#dc2626",
                  background: "#fef2f2",
                  padding: "10px",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              >
                {error}
              </p>
            )}

            {/* SUCCESS */}

            {success && (
              <p
                style={{
                  color: "#15803d",
                  background: "#f0fdf4",
                  padding: "10px",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              >
                {success}
              </p>
            )}

            {/* SUBMIT */}

            <button
              className="login-button"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "signin"
                ? "Sign in"
                : "Create Account"}

              {!loading && (
                <ArrowRight size={18} />
              )}
            </button>

          </form>

          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {mode === "signin" ? (
              <>
                Don't have an account?{" "}

                <button
                  type="button"
                  onClick={() =>
                    handleModeChange("signup")
                  }
                  style={{
                    border: "none",
                    background: "none",
                    color: "#6366f1",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() =>
                    handleModeChange("signin")
                  }
                  style={{
                    border: "none",
                    background: "none",
                    color: "#6366f1",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Sign in
                </button>
              </>
            )}
          </div>

          <div className="login-footer">
            AI-Based College Attendance &
            Student Engagement Platform
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;