import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import EmployeeEntry from "../EmployeeEntry";
import "./index.css";
const EmployeeListView = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const getEmployee = async () => {
    try {
      const response = await fetch("http://localhost:8000/get-employee");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const deleteEmployee = async (id) => {
    console.log(`http://localhost:8000/delete-employee/${id}`);
    try {
      const response = await fetch(
        `http://localhost:8000/delete-employee/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting employee");
      }

      getEmployee();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const count = employees.length;

  const onClickEmployeeBtn = () => {
    navigate("/create-employee");
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="el-head-container">
          <h1>Employee List</h1>
          <div className="el-details-container">
            <p>Total Count: {count}</p>
            <button type="button" onClick={onClickEmployeeBtn} className="add-employee-button">
              Create Employee
            </button>
          </div>
        </div>
        {employees.length !== 0 ? (
          <div  className="table">
            <table className="table-row">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Designation</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Create Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <EmployeeEntry
                    key={employee.uniqueId}
                    count={index + 1}
                    employee={employee}
                    onDelete={deleteEmployee}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h1>No Employee Added</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default EmployeeListView;
