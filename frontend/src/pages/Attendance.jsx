import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Search,
  Users,
  X,
  RotateCcw,
  Save,
  BookOpen,
  GraduationCap,
  Building2
} from "lucide-react";

import "./Attendance.css";

function Attendance() {
  const navigate = useNavigate();

  /* =========================
     FILTER STATES
  ========================= */

  const [department, setDepartment] = useState("Computer Science");
  const [year, setYear] = useState("III Year");
  const [section, setSection] = useState("A");
  const [subject, setSubject] = useState("Data Science");

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [search, setSearch] = useState("");

  /* =========================
     STUDENT DATA
  ========================= */

  const initialStudents = [
    {
      id: "CSE001",
      name: "Arun Kumar",
      rollNo: "23CSE001",
      status: "Present",
      attendance: 86
    },
    {
      id: "CSE002",
      name: "Priya Sharma",
      rollNo: "23CSE002",
      status: "Present",
      attendance: 91
    },
    {
      id: "CSE003",
      name: "Rahul Raj",
      rollNo: "23CSE003",
      status: "Absent",
      attendance: 68
    },
    {
      id: "CSE004",
      name: "Divya S",
      rollNo: "23CSE004",
      status: "Present",
      attendance: 94
    },
    {
      id: "CSE005",
      name: "Karthik M",
      rollNo: "23CSE005",
      status: "Present",
      attendance: 82
    },
    {
      id: "CSE006",
      name: "Nithya R",
      rollNo: "23CSE006",
      status: "Present",
      attendance: 88
    },
    {
      id: "CSE007",
      name: "Vishal Kumar",
      rollNo: "23CSE007",
      status: "Absent",
      attendance: 64
    },
    {
      id: "CSE008",
      name: "Meena Devi",
      rollNo: "23CSE008",
      status: "Present",
      attendance: 90
    },
    {
      id: "CSE009",
      name: "Sanjay P",
      rollNo: "23CSE009",
      status: "Present",
      attendance: 79
    },
    {
      id: "CSE010",
      name: "Harini S",
      rollNo: "23CSE010",
      status: "Present",
      attendance: 96
    }
  ];

  const [students, setStudents] = useState(initialStudents);

  const [saveMessage, setSaveMessage] = useState("");

  /* =========================
     LOAD SAVED ATTENDANCE
  ========================= */

  useEffect(() => {
    const savedData = localStorage.getItem("attendanceRecord");

    if (!savedData) {
      return;
    }

    try {
      const parsedData = JSON.parse(savedData);

      if (
        parsedData.date === selectedDate &&
        parsedData.subject === subject &&
        Array.isArray(parsedData.students)
      ) {
        setStudents((currentStudents) =>
          currentStudents.map((student) => {
            const savedStudent = parsedData.students.find(
              (item) => item.id === student.id
            );

            if (savedStudent) {
              return {
                ...student,
                status: savedStudent.status
              };
            }

            return student;
          })
        );
      }
    } catch (error) {
      console.error("Unable to load attendance:", error);
    }
  }, [selectedDate, subject]);

  /* =========================
     CHANGE ATTENDANCE
  ========================= */

  const updateStatus = (id, status) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === id
          ? {
              ...student,
              status
            }
          : student
      )
    );

    setSaveMessage("");
  };

  /* =========================
     MARK ALL PRESENT
  ========================= */

  const markAllPresent = () => {
    setStudents((currentStudents) =>
      currentStudents.map((student) => ({
        ...student,
        status: "Present"
      }))
    );

    setSaveMessage("");
  };

  /* =========================
     MARK ALL ABSENT
  ========================= */

  const markAllAbsent = () => {
    setStudents((currentStudents) =>
      currentStudents.map((student) => ({
        ...student,
        status: "Absent"
      }))
    );

    setSaveMessage("");
  };

  /* =========================
     RESET
  ========================= */

  const resetAttendance = () => {
    setStudents(initialStudents);
    setSaveMessage("");
  };

  /* =========================
     FILTER STUDENTS
  ========================= */

  const filteredStudents = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return students;
    }

    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(value) ||
        student.rollNo.toLowerCase().includes(value)
    );
  }, [students, search]);

  /* =========================
     ATTENDANCE STATISTICS
  ========================= */

  const totalStudents = students.length;

  const presentCount = students.filter(
    (student) => student.status === "Present"
  ).length;

  const absentCount = students.filter(
    (student) => student.status === "Absent"
  ).length;

  const attendancePercentage =
    totalStudents === 0
      ? 0
      : Math.round((presentCount / totalStudents) * 100);

  /* =========================
     SAVE ATTENDANCE
  ========================= */

  const handleSaveAttendance = () => {
    const attendanceRecord = {
      date: selectedDate,
      department,
      year,
      section,
      subject,
      savedAt: new Date().toISOString(),

      totalStudents,

      presentCount,

      absentCount,

      attendancePercentage,

      students: students.map((student) => ({
        id: student.id,
        name: student.name,
        rollNo: student.rollNo,
        status: student.status
      }))
    };

    localStorage.setItem(
      "attendanceRecord",
      JSON.stringify(attendanceRecord)
    );

    /* Store history also */

    const existingHistory =
      JSON.parse(
        localStorage.getItem("attendanceHistory") || "[]"
      );

    const newHistory = [
      ...existingHistory.filter(
        (record) =>
          !(
            record.date === selectedDate &&
            record.subject === subject &&
            record.section === section
          )
      ),
      attendanceRecord
    ];

    localStorage.setItem(
      "attendanceHistory",
      JSON.stringify(newHistory)
    );

    setSaveMessage(
      `Attendance saved successfully for ${presentCount} present and ${absentCount} absent students.`
    );
  };

  return (
    <div className="attendance-page">

      {/* ================= HEADER ================= */}

      <header className="attendance-header">

        <button
          className="attendance-back"
          onClick={() => navigate("/faculty")}
        >
          <ArrowLeft size={17} />
          Dashboard
        </button>

        <div className="attendance-brand">

          <div className="attendance-brand-icon">
            <ClipboardCheck size={19} />
          </div>

          <div>
            <strong>Attendance Management</strong>
            <span>Faculty Portal</span>
          </div>

        </div>

        <div className="header-date">
          <CalendarDays size={15} />
          {selectedDate}
        </div>

      </header>


      <main className="attendance-container">

        {/* ================= TITLE ================= */}

        <section className="attendance-title">

          <div>

            <p>DAILY ATTENDANCE</p>

            <h1>
              Mark Attendance
            </h1>

            <span>
              Record and monitor student attendance
              for your classes.
            </span>

          </div>

        </section>


        {/* ================= FILTERS ================= */}

        <section className="attendance-filters">

          <div className="filter-group">

            <label>
              <Building2 size={12} />
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


          <div className="filter-group">

            <label>
              <GraduationCap size={12} />
              Year
            </label>

            <select
              value={year}
              onChange={(e) =>
                setYear(e.target.value)
              }
            >

              <option>I Year</option>
              <option>II Year</option>
              <option>III Year</option>
              <option>IV Year</option>

            </select>

          </div>


          <div className="filter-group">

            <label>
              Section
            </label>

            <select
              value={section}
              onChange={(e) =>
                setSection(e.target.value)
              }
            >

              <option>A</option>
              <option>B</option>
              <option>C</option>

            </select>

          </div>


          <div className="filter-group">

            <label>
              <BookOpen size={12} />
              Subject
            </label>

            <select
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
            >

              <option>Data Science</option>
              <option>Artificial Intelligence</option>
              <option>Database Management</option>
              <option>Computer Networks</option>
              <option>Operating Systems</option>

            </select>

          </div>


          <div className="filter-group">

            <label>
              <CalendarDays size={12} />
              Date
            </label>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(e.target.value)
              }
            />

          </div>

        </section>


        {/* ================= STATISTICS ================= */}

        <section className="attendance-stats">

          <div className="attendance-stat">

            <div className="stat-icon purple">
              <Users size={18} />
            </div>

            <div>

              <span>
                Total Students
              </span>

              <strong>
                {totalStudents}
              </strong>

            </div>

          </div>


          <div className="attendance-stat">

            <div className="stat-icon green">
              <CheckCircle2 size={18} />
            </div>

            <div>

              <span>
                Present
              </span>

              <strong>
                {presentCount}
              </strong>

            </div>

          </div>


          <div className="attendance-stat">

            <div className="stat-icon red">
              <X size={18} />
            </div>

            <div>

              <span>
                Absent
              </span>

              <strong>
                {absentCount}
              </strong>

            </div>

          </div>


          <div className="attendance-stat">

            <div className="stat-icon blue">
              <ClipboardCheck size={18} />
            </div>

            <div>

              <span>
                Today's Attendance
              </span>

              <strong>
                {attendancePercentage}%
              </strong>

            </div>

          </div>

        </section>


        {/* ================= TOOLBAR ================= */}

        <section className="attendance-toolbar">

          <div className="search-box">

            <Search size={15} />

            <input
              type="text"
              placeholder="Search student name or roll number..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="toolbar-actions">

            <button
              className="action-present"
              onClick={markAllPresent}
            >
              <Check size={14} />
              Mark All Present
            </button>


            <button
              className="action-absent"
              onClick={markAllAbsent}
            >
              <X size={14} />
              Mark All Absent
            </button>


            <button
              className="action-reset"
              onClick={resetAttendance}
            >
              <RotateCcw size={14} />
              Reset
            </button>

          </div>

        </section>


        {/* ================= TABLE ================= */}

        <section className="attendance-table-card">

          <div className="table-heading">

            <div>

              <h2>
                {subject}
              </h2>

              <p>
                {department} • {year} • Section {section}
              </p>

            </div>

            <span>
              {selectedDate}
            </span>

          </div>


          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    #
                  </th>

                  <th>
                    Student
                  </th>

                  <th>
                    Roll Number
                  </th>

                  <th>
                    Overall Attendance
                  </th>

                  <th>
                    Today's Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredStudents.length > 0 ? (

                  filteredStudents.map(
                    (student, index) => (

                      <tr key={student.id}>

                        <td>
                          {index + 1}
                        </td>


                        <td>

                          <div className="student-info">

                            <div className="student-avatar">
                              {student.name
                                .split(" ")
                                .map((name) => name[0])
                                .join("")
                                .slice(0, 2)}
                            </div>

                            <div>

                              <strong>
                                {student.name}
                              </strong>

                              <span>
                                Student
                              </span>

                            </div>

                          </div>

                        </td>


                        <td>

                          <span className="roll-number">
                            {student.rollNo}
                          </span>

                        </td>


                        <td>

                          <div className="overall-attendance">

                            <div className="attendance-progress">

                              <div
                                className={
                                  student.attendance < 65
                                    ? "progress-fill danger"
                                    : student.attendance < 75
                                    ? "progress-fill warning"
                                    : "progress-fill"
                                }
                                style={{
                                  width: `${student.attendance}%`
                                }}
                              />

                            </div>

                            <span
                              className={
                                student.attendance < 65
                                  ? "attendance-percent danger-text"
                                  : student.attendance < 75
                                  ? "attendance-percent warning-text"
                                  : "attendance-percent"
                              }
                            >
                              {student.attendance}%
                            </span>

                          </div>

                        </td>


                        <td>

                          <div className="status-buttons">

                            <button
                              className={
                                student.status === "Present"
                                  ? "status-btn present active"
                                  : "status-btn present"
                              }
                              onClick={() =>
                                updateStatus(
                                  student.id,
                                  "Present"
                                )
                              }
                            >
                              <Check size={13} />
                              Present
                            </button>


                            <button
                              className={
                                student.status === "Absent"
                                  ? "status-btn absent active"
                                  : "status-btn absent"
                              }
                              onClick={() =>
                                updateStatus(
                                  student.id,
                                  "Absent"
                                )
                              }
                            >
                              <X size={13} />
                              Absent
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="empty-state"
                    >
                      No students found.

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>


          {/* ================= SAVE AREA ================= */}

          <div className="attendance-footer">

            <div>

              {saveMessage && (

                <div className="save-success">

                  <CheckCircle2 size={16} />

                  <span>
                    {saveMessage}
                  </span>

                </div>

              )}

            </div>


            <button
              className="save-attendance-btn"
              onClick={handleSaveAttendance}
            >

              <Save size={16} />

              Save Attendance

            </button>

          </div>

        </section>


        {/* ================= INFO ================= */}

        <section className="attendance-info">

          <div className="info-icon">
            <ClipboardCheck size={17} />
          </div>

          <div>

            <strong>
              Attendance saved locally
            </strong>

            <p>
              Your attendance data is currently stored
              in the browser. Once the backend API is
              connected, this data can be saved to the
              college database automatically.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Attendance;