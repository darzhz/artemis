import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSubjectForm = () => {
  const [subjectData, setSubjectData] = useState({
    sub_code: '',
    sub_name: '',
    faculty_code: '',
    deptid: 1,//TODO: CHANGE THIS VALUE TO PROP
    subinfo: [
      { module: '', description: '' },
    ],
  });

  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    // Fetch faculties data when the component mounts
    axios.get('/search/type/faculty')
      .then(response => setFaculties(response.data))
      .catch(error => console.error('Error fetching faculties data:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubjectData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubinfoChange = (index, e) => {
    const { name, value } = e.target;
    setSubjectData(prevData => {
      const newSubinfo = [...prevData.subinfo];
      newSubinfo[index] = { ...newSubinfo[index], [name]: value };
      return { ...prevData, subinfo: newSubinfo };
    });
  };

  const handleAddSubinfoField = () => {
    setSubjectData(prevData => ({
      ...prevData,
      subinfo: [...prevData.subinfo, { module: '', description: '' }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request to add subject
    axios.post('http://localhost:8080/subjects/add', subjectData)
      .then(response => {
        console.log('Subject added successfully:', response.data);
        // Optionally, you can reset the form or redirect to another page
      })
      .catch(error => console.error('Error adding subject:', error));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Subject</h2>

      <form onSubmit={handleSubmit}>
        {/* ... Other input fields ... */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1" htmlFor="sub_code">Subject Code</label>
          <input
            type="text"
            id="sub_code"
            name="sub_code"
            value={subjectData.sub_code}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1" htmlFor="sub_name">Subject Name</label>
          <input
            type="text"
            id="sub_name"
            name="sub_name"
            value={subjectData.sub_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1" htmlFor="faculty_code">Faculty Code</label>
          <select
            id="faculty_code"
            name="faculty_code"
            value={subjectData.faculty_code}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="" disabled>Select Faculty</option>
            {faculties.map(faculty => (
              <option key={faculty.user_id} value={faculty.user_id}>{faculty.name} - {faculty.user_id}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Subject Information</label>
          {subjectData.subinfo.map((subinfoEntry, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                name={`module${index + 1}`}
                onChange={(e) => handleSubinfoChange(index, 'module', e)}
                placeholder={`Module ${index + 1}`}
                className="w-full p-2 border rounded-md mb-2"
              />
              <input
                type="text"
                name={`description${index + 1}`}
                onChange={(e) => handleSubinfoChange(index, 'description', e)}
                placeholder={`Description ${index + 1}`}
                className="w-full p-2 border rounded-md mb-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSubinfoField}
            className="bg-green-500 text-white p-2 rounded-md"
          >
            Add More
          </button>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Add Subject
        </button>
      </form>
    </div>
  );
};

export default AddSubjectForm;
