import { useState } from "react";
import {
  ArrowLeft,
  Settings as SettingsIcon,
  User,
  Bell,
  Brain,
  Shield,
  Palette,
  Save,
  CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

function Settings() {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");

  const [name, setName] = useState("Faculty User");
  const [email, setEmail] = useState("faculty@college.edu");
  const [department, setDepartment] = useState("Computer Science");

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [riskAlerts, setRiskAlerts] = useState(true);
  const [attendanceAlerts, setAttendanceAlerts] = useState(true);

  const [aiEnabled, setAiEnabled] = useState(true);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: <User size={17} />
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell size={17} />
    },
    {
      id: "ai",
      label: "AI Preferences",
      icon: <Brain size={17} />
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: <Palette size={17} />
    },
    {
      id: "security",
      label: "Security",
      icon: <Shield size={17} />
    }
  ];

  return (
    <div className="settings-page">

      {/* HEADER */}

      <header className="settings-header">

        <button
          className="settings-back"
          onClick={() => navigate("/faculty")}
        >
          <ArrowLeft size={17} />
          Dashboard
        </button>

        <div className="settings-brand">

          <div className="settings-brand-icon">
            <SettingsIcon size={18} />
          </div>

          <strong>
            Faculty Settings
          </strong>

        </div>

        <div></div>

      </header>


      <main className="settings-container">

        {/* TITLE */}

        <section className="settings-title">

          <p>ACCOUNT CONFIGURATION</p>

          <h1>
            Settings
          </h1>

          <span>
            Manage your faculty profile, notifications
            and AI preferences.
          </span>

        </section>


        <section className="settings-layout">

          {/* SIDEBAR */}

          <aside className="settings-sidebar">

            {tabs.map((tab) => (

              <button
                key={tab.id}
                className={
                  activeTab === tab.id
                    ? "settings-tab active"
                    : "settings-tab"
                }
                onClick={() => setActiveTab(tab.id)}
              >

                {tab.icon}

                <span>
                  {tab.label}
                </span>

              </button>

            ))}

          </aside>


          {/* CONTENT */}

          <section className="settings-content">


            {/* PROFILE */}

            {activeTab === "profile" && (

              <div className="settings-section">

                <div className="section-heading">

                  <div>
                    <h2>
                      Faculty Profile
                    </h2>

                    <p>
                      Update your personal information.
                    </p>
                  </div>

                  <User size={19} />

                </div>


                <div className="profile-avatar">

                  <div className="avatar-circle">
                    FU
                  </div>

                  <div>
                    <strong>
                      Faculty User
                    </strong>

                    <span>
                      Faculty Account
                    </span>
                  </div>

                </div>


                <div className="form-grid">

                  <div className="form-group">

                    <label>
                      Full Name
                    </label>

                    <input
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Email Address
                    </label>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Department
                    </label>

                    <select
                      value={department}
                      onChange={(e) =>
                        setDepartment(e.target.value)
                      }
                    >

                      <option>
                        Computer Science
                      </option>

                      <option>
                        Information Technology
                      </option>

                      <option>
                        Electronics
                      </option>

                      <option>
                        Artificial Intelligence
                      </option>

                    </select>

                  </div>


                  <div className="form-group">

                    <label>
                      Role
                    </label>

                    <input
                      value="Faculty"
                      disabled
                    />

                  </div>

                </div>

              </div>

            )}


            {/* NOTIFICATIONS */}

            {activeTab === "notifications" && (

              <div className="settings-section">

                <div className="section-heading">

                  <div>
                    <h2>
                      Notifications
                    </h2>

                    <p>
                      Choose which alerts you want to receive.
                    </p>
                  </div>

                  <Bell size={19} />

                </div>


                <div className="setting-option">

                  <div>

                    <strong>
                      Email Notifications
                    </strong>

                    <span>
                      Receive important platform updates.
                    </span>

                  </div>

                  <label className="switch">

                    <input
                      type="checkbox"
                      checked={emailAlerts}
                      onChange={(e) =>
                        setEmailAlerts(e.target.checked)
                      }
                    />

                    <span className="slider"></span>

                  </label>

                </div>


                <div className="setting-option">

                  <div>

                    <strong>
                      AI Risk Alerts
                    </strong>

                    <span>
                      Notify when students are detected
                      as high risk.
                    </span>

                  </div>

                  <label className="switch">

                    <input
                      type="checkbox"
                      checked={riskAlerts}
                      onChange={(e) =>
                        setRiskAlerts(e.target.checked)
                      }
                    />

                    <span className="slider"></span>

                  </label>

                </div>


                <div className="setting-option">

                  <div>

                    <strong>
                      Attendance Alerts
                    </strong>

                    <span>
                      Notify about students with low attendance.
                    </span>

                  </div>

                  <label className="switch">

                    <input
                      type="checkbox"
                      checked={attendanceAlerts}
                      onChange={(e) =>
                        setAttendanceAlerts(e.target.checked)
                      }
                    />

                    <span className="slider"></span>

                  </label>

                </div>

              </div>

            )}


            {/* AI */}

            {activeTab === "ai" && (

              <div className="settings-section">

                <div className="section-heading">

                  <div>
                    <h2>
                      AI Preferences
                    </h2>

                    <p>
                      Configure intelligent student monitoring.
                    </p>
                  </div>

                  <Brain size={19} />

                </div>


                <div className="ai-settings-box">

                  <div className="ai-settings-icon">
                    <Brain size={20} />
                  </div>

                  <div>

                    <strong>
                      AI Student Risk Detection
                    </strong>

                    <span>
                      Automatically analyze attendance
                      and engagement to identify students
                      who may require intervention.
                    </span>

                  </div>

                  <label className="switch">

                    <input
                      type="checkbox"
                      checked={aiEnabled}
                      onChange={(e) =>
                        setAiEnabled(e.target.checked)
                      }
                    />

                    <span className="slider"></span>

                  </label>

                </div>


                <div className="ai-info">

                  <Brain size={17} />

                  <div>

                    <strong>
                      How AI works
                    </strong>

                    <p>
                      The system analyzes attendance,
                      engagement and performance patterns
                      to generate early-warning insights.
                    </p>

                  </div>

                </div>

              </div>

            )}


            {/* APPEARANCE */}

            {activeTab === "appearance" && (

              <div className="settings-section">

                <div className="section-heading">

                  <div>

                    <h2>
                      Appearance
                    </h2>

                    <p>
                      Customize the appearance of your dashboard.
                    </p>

                  </div>

                  <Palette size={19} />

                </div>


                <div className="theme-options">

                  <button className="theme-card selected">

                    <div className="theme-preview light-preview">
                      Aa
                    </div>

                    <strong>
                      Light
                    </strong>

                    <span>
                      Clean and bright
                    </span>

                  </button>


                  <button className="theme-card">

                    <div className="theme-preview dark-preview">
                      Aa
                    </div>

                    <strong>
                      Dark
                    </strong>

                    <span>
                      Coming soon
                    </span>

                  </button>

                </div>

              </div>

            )}


            {/* SECURITY */}

            {activeTab === "security" && (

              <div className="settings-section">

                <div className="section-heading">

                  <div>

                    <h2>
                      Security
                    </h2>

                    <p>
                      Manage your account security.
                    </p>

                  </div>

                  <Shield size={19} />

                </div>


                <div className="security-box">

                  <Shield size={22} />

                  <div>

                    <strong>
                      Faculty Account
                    </strong>

                    <span>
                      Your account is protected by secure
                      authentication.
                    </span>

                  </div>

                  <span className="secure-badge">
                    Secure
                  </span>

                </div>


                <button className="password-button">
                  Change Password
                </button>

              </div>

            )}


            {/* SAVE */}

            <div className="settings-footer">

              {saved && (

                <div className="saved-message">

                  <CheckCircle2 size={15} />

                  Settings saved successfully

                </div>

              )}

              <button
                className="save-button"
                onClick={handleSave}
              >

                <Save size={15} />

                Save Changes

              </button>

            </div>


          </section>

        </section>

      </main>

    </div>
  );
}

export default Settings;