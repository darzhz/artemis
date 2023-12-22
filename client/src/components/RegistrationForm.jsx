import React, { useState } from "react";

const RegistrationForm = () => {
  const [userData, setUserData] = useState({
    name: "",
    role: "",
    email: "",
    // Add other fields from the Users table
  });
  async function sendData(data, endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: "POST", // or 'GET' or any other HTTP method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        return { success: true, response: responseData };
      } else {
        const errorData = await response.json();
        return { success: false, response: errorData };
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error sending data:", error);
      return { success: false, response: { error: "Network error" } };
    }
  }

  const [secondPartData, setSecondPartData] = useState({
    // Additional fields based on user type
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setUserData((prevData) => ({ ...prevData, role }));
    setSecondPartData({}); // Reset second part data when role changes
  };

  const renderSecondPart = () => {
    if (userData.role === "student") {
      return (
        <>
          <label className="label" htmlFor="department">
            <span className="label-text">Department</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            id="department"
            name="department"
            value={secondPartData.department || ""}
            onChange={(e) =>
              setSecondPartData({
                ...secondPartData,
                department: e.target.value,
              })
            }
            required
          />

          {/* Other Fields from the Student Table */}
          <div className="mb-2">
            <label htmlFor="semester" className="label">
              <span className="label-text">Semester</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              id="semester"
              type="number"
              name="semester"
              placeholder="Enter Semester"
              value={secondPartData.semester || ""}
              onChange={(e) =>
                setSecondPartData({
                  ...secondPartData,
                  semester: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="dob" className="label">
              <span className="label-text">Date of Birth</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              id="dob"
              type="date"
              name="dob"
              value={secondPartData.dob || ""}
              onChange={(e) =>
                setSecondPartData({
                  ...secondPartData,
                  dob: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="rollnum" className="label">
              <span className="label-text">Roll Number</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              id="rollnum"
              type="number"
              name="rollnum"
              placeholder="Enter Roll Number"
              value={secondPartData.rollnum || ""}
              onChange={(e) =>
                setSecondPartData({
                  ...secondPartData,
                  rollnum: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="admNum" className="label">
              <span className="label-text">Admission Number</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              id="admNum"
              type="number"
              name="admNum"
              placeholder="Enter Admission Number"
              value={secondPartData.admNum || ""}
              onChange={(e) =>
                setSecondPartData({
                  ...secondPartData,
                  admNum: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="cgpa" className="label">
              <span className="label-text">CGPA</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              id="cgpa"
              type="number"
              name="cgpa"
              placeholder="Enter CGPA"
              value={secondPartData.cgpa || 0}
              onChange={(e) =>
                setSecondPartData({
                  ...secondPartData,
                  cgpa: e.target.value,
                })
              }
              required
            />
          </div>
          {/* Add other fields from the Student table */}
        </>
      );
    } else if (userData.role === "faculty") {
      return (
        <>
          <label htmlFor="deptName" className="label"><span className="label-text">Department Name</span></label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            id="deptName"
            name="deptName"
            value={secondPartData.deptName || ""}
            onChange={(e) =>
              setSecondPartData({ ...secondPartData, deptName: e.target.value })
            }
            required
          />

          {/* Add other fields from the Faculty table */}
        </>
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine first and second part data for submission
    const registrationData = { ...userData, ...secondPartData };
    console.log(registrationData);
    sendData(registrationData,'/register')

    // Optional: Send registrationData to your backend for further processing

    // Reset the form after submission
    setUserData({
      name: "",
      role: "",
      email: "",
    });
    setSecondPartData({});
  };

  return (
    <div>
      <h5>User Registration</h5>

      {/* First Part of the Form */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="input input-bordered w-full max-w-xs"
          value={userData.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="role" className="label">
          <span className="label-text">Role</span>
        </label>
        <select
          id="role"
          name="role"
          className="mx-auto input input-bordered w-full max-w-xs"
          value={userData.role}
          onChange={handleRoleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="HOD">Head of Department</option>
        </select>

        <label className="label" htmlFor="email">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="input input-bordered w-full max-w-xs"
          value={userData.email}
          onChange={handleInputChange}
          required
        />

        {/* Other fields from the Users table */}

        {/* Second Part of the Form - Rendered dynamically based on user type */}
        {renderSecondPart()}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
