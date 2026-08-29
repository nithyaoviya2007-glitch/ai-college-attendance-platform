import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Search,
  Users,
  Brain,
  TrendingUp,
  ChevronRight,
  Filter,
  UserRound
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./Students.css";

function Students() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================================
  // GET STUDENTS FROM BACKEND
  // ================================
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/students"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await response.json();

        if (data.success) {
          setStudents(data.students);
        } else {
          throw new Error(data.message || "Failed to load students");
        }
      } catch (err) {
        console.error("Student fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // ================================
  // SEARCH + FILTER
  // ================================
  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      student.name?.toLowerCase().includes(searchText) ||
      student.registerNumber?.toLowerCase().includes(searchText) ||
      student.email?.toLowerCase().includes(searchText);

    const matchesDepartment =
      department === "All" ||
      student.department === department;

    return matchesSearch && matchesDepartment;
  });

  // ================================
  // DEPARTMENTS
  // ================================
  const departments = [
    "All",
    ...new Set(students.map((student) => student.department))
  ];

  return (
    <div className="students-page">

      {/* HEADER */}
      <header className="students-header">

        <button
          className="students-back"
          onClick={() => navigate("/faculty")}
        >
          <ArrowLeft size={17} />
          Dashboard
        </button>

        <div className="students-brand">

          <div className="students-brand-icon">
            <Users size={19} />
          </div>

          <strong>
            Student Management
          </strong>

        </div>

        <div className="student-count">
          <Users size={15} />
          {students.length} Students
        </div>

      </header>

      <main className="students-container">

        {/* TITLE */}
        <section className="students-title">

          <div>
            <p>
              ACADEMIC MANAGEMENT
            </p>

            <h1>
              Students
            </h1>

            <span>
              Monitor attendance, engagement and AI risk levels.
            </span>
          </div>

        </section>

        {/* STATS */}
        <section className="student-stats">

          <div className="stat-card">

            <div className="stat-icon purple">
              <Users size={18} />
            </div>

            <span>
              Total Students
            </span>

            <strong>
              {students.length}
            </strong>

          </div>


          <div className="stat-card">

            <div className="stat-icon red">
              <Brain size={18} />
            </div>

            <span>
              High Risk
            </span>

            <strong>
              -
            </strong>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              <TrendingUp size={18} />
            </div>

            <span>
              Average Attendance
            </span>

            <strong>
              -
            </strong>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              <UserRound size={18} />
            </div>

            <span>
              Active Students
            </span>

            <strong>
              {students.length}
            </strong>

          </div>

        </section>


        {/* SEARCH */}
        <section className="student-tools">

          <div className="search-box">

            <Search size={17} />

            <input
              type="text"
              placeholder="Search by student name, register number or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          <div className="filter-box">

            <Filter size={15} />

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >

              {departments.map((dept) => (
                <option
                  key={dept}
                  value={dept}
                >
                  {dept === "All"
                    ? "All Departments"
                    : dept}
                </option>
              ))}

            </select>

          </div>

        </section>


        {/* TABLE */}
        <section className="students-table-card">

          <div className="table-header">

            <div>
              <h2>
                Student Overview
              </h2>

              <p>
                Real-time student data from MongoDB
              </p>
            </div>

            <span>
              {filteredStudents.length} results
            </span>

          </div>


          {/* LOADING */}
          {loading && (
            <div className="no-students">
              <h3>
                Loading students...
              </h3>

              <p>
                Connecting to the backend.
              </p>
            </div>
          )}


          {/* ERROR */}
          {!loading && error && (
            <div className="no-students">

              <h3>
                Unable to load students
              </h3>

              <p>
                {error}
              </p>

              <p>
                Make sure your backend is running on port 5000.
              </p>

            </div>
          )}


          {/* TABLE */}
          {!loading && !error && filteredStudents.length > 0 && (

            <div className="table-wrapper">

              <table>

                <thead>

                  <tr>

                    <th>
                      STUDENT
                    </th>

                    <th>
                      DEPARTMENT
                    </th>

                    <th>
                      EMAIL
                    </th>

                    <th>
                      YEAR
                    </th>

                    <th>
                      ACTION
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredStudents.map((student) => (

                    <tr key={student._id}>

                      {/* STUDENT */}

                      <td>

                        <div className="student-info">

                          <div className="student-avatar">
                            {student.name?.charAt(0).toUpperCase()}
                          </div>

                          <div>

                            <strong>
                              {student.name}
                            </strong>

                            <small>
                              {student.registerNumber}
                            </small>

                          </div>

                        </div>

                      </td>


                      {/* DEPARTMENT */}

                      <td>

                        <span className="department">
                          {student.department}
                        </span>

                      </td>


                      {/* EMAIL */}

                      <td>
                        {student.email}
                      </td>


                      {/* YEAR */}

                      <td>
                        {student.year}
                      </td>


                      {/* ACTION */}

                      <td>

                        <button
                          className="view-button"
                          onClick={() =>
                            navigate(`/students/${student._id}`)
                          }
                        >
                          View
                          <ChevronRight size={14} />
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}


          {/* NO RESULTS */}

          {!loading &&
            !error &&
            filteredStudents.length === 0 && (

              <div className="no-students">

                <Users size={30} />

                <h3>
                  No students found
                </h3>

                <p>
                  Try changing your search or department filter.
                </p>

              </div>

            )}

        </section>

      </main>

    </div>
  );
}

export default Students;