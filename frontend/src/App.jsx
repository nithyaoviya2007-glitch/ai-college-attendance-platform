import { BrowserRouter, Routes, Route } from "react-router-dom";

// Main pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import FacultyDashboard from "./pages/FacultyDashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import RiskMonitor from "./pages/RiskMonitor";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import WhatIfSimulator from "./pages/WhatIfSimulator";

// Student pages
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";
import MyAttendance from "./pages/MyAttendance";
import StudentAnalytics from "./pages/StudentAnalytics";
import StudentAIInsights from "./pages/StudentAIInsights";
import StudentNotifications from "./pages/StudentNotifications";
import StudentProfile from "./pages/StudentProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= MAIN PAGES ================= */}

        {/* Landing Page */}
        <Route
          path="/"
          element={<Landing />}
        />

        {/* Faculty Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Faculty Dashboard */}
        <Route
          path="/faculty"
          element={<FacultyDashboard />}
        />

        {/* Student Management */}
        <Route
          path="/students"
          element={<Students />}
        />

        {/* Faculty Attendance */}
        <Route
          path="/attendance"
          element={<Attendance />}
        />

        {/* AI Risk Monitor */}
        <Route
          path="/risk-monitor"
          element={<RiskMonitor />}
        />

        {/* Faculty Settings */}
        <Route
          path="/settings"
          element={<Settings />}
        />

        {/* Faculty Analytics */}
        <Route
          path="/analytics"
          element={<Analytics />}
        />

        {/* What-If Simulator */}
        <Route
          path="/simulator"
          element={<WhatIfSimulator />}
        />


        {/* ================= STUDENT PAGES ================= */}

        {/* Student Login */}
        <Route
          path="/student-login"
          element={<StudentLogin />}
        />

        {/* Student Dashboard */}
        <Route
          path="/student"
          element={<StudentDashboard />}
        />

        {/* Student Attendance */}
        <Route
          path="/student/attendance"
          element={<MyAttendance />}
        />
        <Route
        path="/student/analytics"
        element={<StudentAnalytics />}
/>
<Route
  path="/student/ai-insights"
  element={<StudentAIInsights />}
/>
<Route
  path="/student/notifications"
  element={<StudentNotifications />}
/>
<Route
  path="/student/profile"
  element={<StudentProfile />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;