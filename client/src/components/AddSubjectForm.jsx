import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const AddSubjectForm = () => {
  const [subjectData, setSubjectData] = useState({
    sub_code: "",
    sub_name: "",
    faculty_code: "",
    deptid: 1, //TODO CHANGE THIS TO USER
    subinfo: [
      {
        module: "",
        subunits: [
          {
            subunit: "",
            hours_allotted: 0,
            date_commencement: "",
            date_completion: "",
          },
        ],
      },
    ],
  });

  const [faculties, setFaculties] = useState([]);
  const addSubunitClicked = useRef(false);

  useEffect(() => {
    // Fetch faculties data when the component mounts
    axios
      .get("/search/type/faculty")
      .then((response) => setFaculties(response.data))
      .catch((error) => console.error("Error fetching faculties data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubinfoChange = (moduleIndex, subunitIndex, name, e) => {
    const { value } = e.target;
    setSubjectData((prevData) => {
      const newSubinfo = [...prevData.subinfo];
      if (!newSubinfo[moduleIndex].subunits) {
        newSubinfo[moduleIndex].subunits = [];
      }
      newSubinfo[moduleIndex].subunits[subunitIndex] = {
        ...newSubinfo[moduleIndex].subunits[subunitIndex],
        [name]: value,
      };
      return { ...prevData, subinfo: newSubinfo };
    });
  };

  const handleAddModuleField = () => {
    setSubjectData((prevData) => ({
      ...prevData,
      subinfo: [
        ...prevData.subinfo,
        { module: "", subunits: [{ subunit: "" }] },
      ],
    }));
  };
  const handleAddSubunitField = (moduleIndex) => {
    if (!addSubunitClicked.current) {
      addSubunitClicked.current = true;

      setSubjectData((prevData) => {
        const newSubinfo = [...prevData.subinfo];
        // Check if 'subunits' array exists for the specified module
        if (!newSubinfo[moduleIndex].subunits) {
          newSubinfo[moduleIndex].subunits = [];
        }
        newSubinfo[moduleIndex].subunits.push({ subunit: "" });
        return { ...prevData, subinfo: newSubinfo };
      });

      // Reset the ref value after the state has been updated
      setTimeout(() => {
        addSubunitClicked.current = false;
      }, 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request to add subject
    axios
      .post("http://localhost:8080/subjects/add", subjectData)
      .then((response) => {
        console.log("Subject added successfully:", response.data);
        // Optionally, you can reset the form or redirect to another page
      })
      .catch((error) => console.error("Error adding subject:", error));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Subject</h2>

      <form onSubmit={handleSubmit}>
        {/* ... (existing input fields) */}
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-1"
            htmlFor="sub_code"
          >
            Subject Code
          </label>
          <input
            type="text"
            id="sub_code"
            name="sub_code"
            defaultValue={subjectData.sub_code}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-1"
            htmlFor="sub_name"
          >
            Subject Name
          </label>
          <input
            type="text"
            id="sub_name"
            name="sub_name"
            defaultValue={subjectData.sub_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-1"
            htmlFor="faculty_code"
          >
            Faculty Code
          </label>
          <select
            id="faculty_code"
            name="faculty_code"
            value={subjectData.faculty_code}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="" disabled>
              Select Faculty
            </option>
            {faculties.map((faculty) => (
              <option key={faculty.user_id} value={faculty.user_id}>
                {faculty.name} - {faculty.user_id}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Subject Information
          </label>
          {subjectData.subinfo.map((module, moduleIndex) => (
            <div key={moduleIndex} className="mb-2">
              <input
                type="text"
                name={`module${moduleIndex + 1}`}
                onChange={(e) =>
                  handleSubinfoChange(moduleIndex, 0, "module", e)
                }
                placeholder={`Module ${moduleIndex + 1}`}
                className="w-full p-2 border rounded-md mb-2"
              />
              {module.subunits.map((subunit, subunitIndex) => (
                <div key={subunitIndex}>
                  <input
                    type="text"
                    name={`subunit${moduleIndex + 1}-${subunitIndex + 1}`}
                    defaultValue={subunit.subunit}
                    onChange={(e) =>
                      handleSubinfoChange(
                        moduleIndex,
                        subunitIndex,
                        "subunit",
                        e
                      )
                    }
                    placeholder={`Subunit ${subunitIndex + 1}`}
                    className="w-full p-2 border rounded-md mb-2"
                  />
                  <input
                    type="number"
                    name={`hours_allotted${moduleIndex + 1}-${
                      subunitIndex + 1
                    }`}
                    value={subunit.hours_allotted}
                    onChange={(e) =>
                      handleSubinfoChange(
                        moduleIndex,
                        subunitIndex,
                        "hours_allotted",
                        e
                      )
                    }
                    placeholder="Hours Allotted"
                    className=" p-2 border rounded-md mb-2 w-24"
                  />
                  <input
                    type="date"
                    name={`date_commencement${moduleIndex + 1}-${
                      subunitIndex + 1
                    }`}
                    value={subunit.date_commencement}
                    onChange={(e) =>
                      handleSubinfoChange(
                        moduleIndex,
                        subunitIndex,
                        "date_commencement",
                        e
                      )
                    }
                    placeholder="Date of Commencement"
                    className="w-fitcontent p-2 border rounded-md mb-2"
                  />
                  <input
                    type="date"
                    name={`date_completion${moduleIndex + 1}-${
                      subunitIndex + 1
                    }`}
                    value={subunit.date_completion}
                    onChange={(e) =>
                      handleSubinfoChange(
                        moduleIndex,
                        subunitIndex,
                        "date_completion",
                        e
                      )
                    }
                    placeholder="Date of Completion"
                    className="w-fitcontent p-2 border rounded-md mb-2"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddSubunitField(moduleIndex)}
                className="bg-green-500 text-white p-2 rounded-md"
              >
                Add Subunit
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddModuleField}
            className="bg-green-500 text-white p-2 rounded-md"
          >
            Add Module
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Add Subject
        </button>
      </form>
    </div>
  );
};

export default AddSubjectForm;
