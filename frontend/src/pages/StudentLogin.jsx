import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Lock,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import "./StudentLogin.css";

function StudentLogin() {
  const navigate = useNavigate();

  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");

    // Demo student login
    if (rollNumber === "CS001" && password === "1234") {
      const studentData = {
        id: "CS001",
        name: "Arun Kumar",
        rollNumber: "CS001",
        department: "Computer Science",
        year: "III Year",
        section: "A",
      };

      localStorage.setItem(
        "student",
        JSON.stringify(studentData)
      );

      navigate("/student");
    } else {
      setError("Invalid Roll Number or Password");
    }
  };

  // Go to Faculty Login
  const handleFacultyLogin = () => {
    navigate("/login");
  };

  return (
    <div className="student-login-page">

      <div className="student-login-card">

        {/* Logo */}
        <div className="student-login-icon">
          <GraduationCap size={38} />
        </div>

        {/* Title */}
        <h1>Student Login</h1>

        <p className="student-login-subtitle">
          AI College Attendance & Engagement Platform
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin}>

          {/* Roll Number */}
          <div className="student-input-group">

            <label htmlFor="rollNumber">
              Roll Number
            </label>

            <div className="student-input-wrapper">

              <User size={19} />

              <input
                id="rollNumber"
                type="text"
                placeholder="Enter your roll number"
                value={rollNumber}
                onChange={(event) =>
                  setRollNumber(event.target.value)
                }
                autoComplete="username"
                required
              />

            </div>

          </div>

          {/* Password */}
          <div className="student-input-group">

            <label htmlFor="studentPassword">
              Password
            </label>

            <div className="student-input-wrapper">

              <Lock size={19} />

              <input
                id="studentPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

            </div>

          </div>

          {/* Error */}
          {error && (
            <p className="student-login-error">
              {error}
            </p>
          )}

          {/* Login */}
          <button
            type="submit"
            className="student-login-button"
          >
            Login
          </button>

        </form>

        {/* Faculty Login */}
        <button
          type="button"
          className="faculty-login-link"
          onClick={handleFacultyLogin}
        >
          Login as Faculty
        </button>

        {/* Demo Credentials */}
        <p className="student-demo">
          Demo Login: CS001 / 1234
        </p>

      </div>

    </div>
  );
}

export default StudentLogin;