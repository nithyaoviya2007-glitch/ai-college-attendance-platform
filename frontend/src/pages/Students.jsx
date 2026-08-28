import { useState } from "react";
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

  const students = [
    {
      id: 1,
      name: "Arun Kumar",
      roll: "CS23A001",
      department: "CSE",
      year: "3rd Year",
      attendance: 62,
      engagement: 48,
      risk: 82,
      status: "High"
    },
    {
      id: 2,
      name: "Priya Sharma",
      roll: "IT23A014",
      department: "IT",
      year: "3rd Year",
      attendance: 71,
      engagement: 64,
      risk: 61,
      status: "Medium"
    },
    {
      id: 3,
      name: "Rahul Raj",
      roll: "CS23A027",
      department: "CSE",
      year: "3rd Year",
      attendance: 91,
      engagement: 87,
      risk: 18,
      status: "Low"
    },
    {
      id: 4,
      name: "Divya S",
      roll: "ECE23A021",
      department: "ECE",
      year: "3rd Year",
      attendance: 78,
      engagement: 72,
      risk: 39,
      status: "Low"
    },
    {
      id: 5,
      name: "Karthik M",
      roll: "IT23A033",
      department: "IT",
      year: "3rd Year",
      attendance: 58,
      engagement: 43,
      risk: 88,
      status: "High"
    }
  ];

  const filteredStudents = students.filter((student) => {

    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.roll.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" ||
      student.department === department;

    return matchesSearch && matchesDepartment;
  });

  const getRiskClass = (status) => {

    if (status === "High") return "high";

    if (status === "Medium") return "medium";

    return "low";
  };

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

            <span>Total Students</span>

            <strong>
              1,248
            </strong>

          </div>


          <div className="stat-card">

            <div className="stat-icon red">
              <Brain size={18} />
            </div>

            <span>High Risk</span>

            <strong>
              86
            </strong>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              <TrendingUp size={18} />
            </div>

            <span>Average Attendance</span>

            <strong>
              82%
            </strong>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              <UserRound size={18} />
            </div>

            <span>Active Students</span>

            <strong>
              1,162
            </strong>

          </div>

        </section>


        {/* SEARCH */}

        <section className="student-tools">

          <div className="search-box">

            <Search size={17} />

            <input
              type="text"
              placeholder="Search by student name or roll number..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="filter-box">

            <Filter size={15} />

            <select
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
            >

              <option value="All">
                All Departments
              </option>

              <option value="CSE">
                CSE
              </option>

              <option value="IT">
                IT
              </option>

              <option value="ECE">
                ECE
              </option>

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
                AI-powered academic monitoring
              </p>
            </div>

            <span>
              {filteredStudents.length} results
            </span>

          </div>


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
                    ATTENDANCE
                  </th>

                  <th>
                    ENGAGEMENT
                  </th>

                  <th>
                    AI RISK
                  </th>

                  <th>
                    ACTION
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredStudents.map((student) => (

                  <tr key={student.id}>

                    <td>

                      <div className="student-info">

                        <div className="student-avatar">
                          {student.name.charAt(0)}
                        </div>

                        <div>

                          <strong>
                            {student.name}
                          </strong>

                          <small>
                            {student.roll}
                          </small>

                        </div>

                      </div>

                    </td>


                    <td>

                      <span className="department">
                        {student.department}
                      </span>

                      <small className="year">
                        {student.year}
                      </small>

                    </td>


                    <td>

                      <div className="attendance-cell">

                        <strong>
                          {student.attendance}%
                        </strong>

                        <div className="progress">

                          <span
                            style={{
                              width:
                                `${student.attendance}%`
                            }}
                          />

                        </div>

                      </div>

                    </td>


                    <td>

                      <div className="engagement">

                        <strong>
                          {student.engagement}
                        </strong>

                        <small>
                          /100
                        </small>

                      </div>

                    </td>


                    <td>

                      <div className="risk-cell">

                        <span
                          className={
                            `risk-badge ${getRiskClass(student.status)}`
                          }
                        >
                          {student.risk}%
                        </span>

                        <small>
                          {student.status}
                        </small>

                      </div>

                    </td>


                    <td>

                      <button
                        className="view-button"
                        onClick={() => {

                          if (student.status === "High") {
                            navigate("/risk-monitor");
                          }

                        }}
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


          {filteredStudents.length === 0 && (

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