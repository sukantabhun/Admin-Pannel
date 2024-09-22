import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "HR",
    gender: "",
    course: [],
    imgUpload: null,
  });

  const existingEmails = ["test@example.com"];

  const onClickReturn = () => {
    navigate("/employee-list");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevState) => {
        if (checked) {
          return {
            ...prevState,
            course: [...prevState.course, value],
          };
        } else {
          return {
            ...prevState,
            course: prevState.course.filter((course) => course !== value),
          };
        }
      });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (existingEmails.includes(formData.email)) {
      alert("Email already exists.");
      return;
    }

    if (
      formData.imgUpload &&
      !["image/jpeg", "image/png"].includes(formData.imgUpload.type)
    ) {
      alert("Please upload a JPG or PNG image.");
      return;
    }

    submitEmployee();
  };

  const submitEmployee = async () => {
    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:8000/create-employee", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/employee-list');
      } else {
        alert("Failed to create employee");
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      alert("An error occurred while creating the employee");
    }
  };

  return (
    <div className="create-employee-form-container">
      <h1>Create Employee</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="create-employee-form"
      >
        <label className="input-label">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
          />
        </label>

        <label className="input-label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />
        </label>

        <label className="input-label">
          Mobile No:
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="input-field"
          />
        </label>

        <label className="input-label">
          Designation:
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="input-field"
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </label>

        <label className="input-label">
          Gender:
          <input
            type="radio"
            name="gender"
            value="M"
            id="M"
            checked={formData.gender === "M"}
            onChange={handleChange}
            required
          />
          <label htmlFor="M">Male</label>
          <input
            type="radio"
            name="gender"
            value="F"
            id="F"
            checked={formData.gender === "F"}
            onChange={handleChange}
            required
          />
          <label htmlFor="F">Female</label>
        </label>

        <label className="input-label">
          Course:
          <input
            type="checkbox"
            name="course"
            value="MCA"
            id="MCA"
            onChange={handleChange}
          />
          <label htmlFor="MCA">MCA</label>
          <input
            type="checkbox"
            name="course"
            value="BCA"
            id="BCA"
            onChange={handleChange}
          />
          <label htmlFor="BCA">BCA</label>
          <input
            type="checkbox"
            name="course"
            value="BSC"
            id="BSC"
            onChange={handleChange}
          />
          <label htmlFor="BSC">BSC</label>
        </label>

        <label className="input-label">
          Image Upload (JPG/PNG only):
          <input
            type="file"
            name="imgUpload"
            accept="image/png, image/jpeg"
            onChange={handleChange}
            required
            className="input-field"
          />
        </label>

        <button type="submit" className="submit-button">
          Submit
        </button>
        <button type="button" onClick={onClickReturn} className="return-button">
          Return
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
