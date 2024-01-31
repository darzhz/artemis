import React, { useEffect } from "react";
import { useState } from "react";
const MySubs = () => {
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(null);
  const [subjectsData ,setsubjectsData] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/subjects/getsubfcode/${storedUser.user_id}`);
        const result = await response.json();
        console.log(result);
        
        if (!result.success) {
          console.error(result.message);
        } else {
          setsubjectsData(result.subjects);
        }
      } catch (e) {
        console.error(e);
      }
    };
  
    fetchData(); 
  
  }, []);

  // Replace this with actual data
  // const subjectsData = [{
  //   "sub_code": "IT456",
  //   "sub_name": "Internet of Things (IoT)",
  //   "faculty_code": "PC1234",
  //   "deptid": 23,
  //   "subinfo": [
  //     {
  //       "module": "Module 1: 10T Architecture (10 Hours)",
  //       "subunits": [
  //         {
  //           "subunit": "What is IoT",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-02-06",
  //           "date_completion": "2024-02-07"
  //         },
  //         {
  //           "subunit": "Genesis of IoT",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-02-08",
  //           "date_completion": "2024-02-09"
  //         },
  //         {
  //           "subunit": "IoT and Digitization",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-02-10",
  //           "date_completion": "2024-02-11"
  //         },
  //         {
  //           "subunit": "IoT Impact",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-02-12",
  //           "date_completion": "2024-02-13"
  //         },
  //         {
  //           "subunit": "Convergence of IT and IoT",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-02-14",
  //           "date_completion": "2024-02-15"
  //         },
  //         {
  //           "subunit": "IoT Challenges",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-02-16",
  //           "date_completion": "2024-02-17"
  //         },
  //         {
  //           "subunit": "IT Network Architecture and Design",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-02-18",
  //           "date_completion": "2024-02-19"
  //         },
  //         {
  //           "subunit": "Drivers Behind New Network Architectures",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-02-20",
  //           "date_completion": "2024-02-21"
  //         },
  //         {
  //           "subunit": "Comparing IoT Architectures",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-02-22",
  //           "date_completion": "2024-02-23"
  //         },
  //         {
  //           "subunit": "A Simplified IoT Architecture",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-02-24",
  //           "date_completion": "2024-02-25"
  //         },
  //         {
  //           "subunit": "The Core IoT Functional Stack",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-02-26",
  //           "date_completion": "2024-02-27"
  //         },
  //         {
  //           "subunit": "IoT Data Management and Compute Stack",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-02-28",
  //           "date_completion": "2024-02-29"
  //         }
  //       ]
  //     }, {
  //       "module": "Module 2: Engineering IT Networks for the IoT Era (8 Hours)",
  //       "subunits": [
  //         {
  //           "subunit": "Smart Objects: The “Things” in IoT",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-03-06",
  //           "date_completion": "2024-03-07"
  //         },
  //         {
  //           "subunit": "Sensors, Actuators, and Smart Objects",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-03-08",
  //           "date_completion": "2024-03-09"
  //         },
  //         {
  //           "subunit": "Sensor Networks, Connecting Smart Objects",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-03-10",
  //           "date_completion": "2024-03-11"
  //         },
  //         {
  //           "subunit": "Communications Criteria, [oT Access Technologies",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-03-12",
  //           "date_completion": "2024-03-13"
  //         },
  //         {
  //           "subunit": "Building Resilient Arteries: Design and Management Strategies for Robust IT Networks in IoT Applications",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-03-14",
  //           "date_completion": "2024-03-15"
  //         },
  //         {
  //           "subunit": "Another Subunit for Module 2",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-03-16",
  //           "date_completion": "2024-03-17"
  //         },
  //         {
  //           "subunit": "Yet Another Subunit for Module 2",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-03-18",
  //           "date_completion": "2024-03-19"
  //         },
  //         {
  //           "subunit": "Final Subunit for Module 2",
  //           "hours_allotted": 1,
  //           "date_commencement": "2024-03-20",
  //           "date_completion": "2024-03-21"
  //         }
  //       ]
  //     },
  //     // ... (the rest of the JSON remains unchanged)
  //   ]
  // }]

  const handleSubjectClick = (index) => {
    setSelectedSubjectIndex(index);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">List of Subjects</h1>
      <div className="DateBox">
        {subjectsData.map((subject, index) => (
          <div
            key={index}
            className="cursor-pointer bg-white rounded-md p-4 Box"
            onClick={() => handleSubjectClick(index)}
          >
            <p className="text-lg font-bold mb-2">{subject.sub_name}</p>
            <p className="text-sm text-gray-600 hover:text-white">{subject.sub_code}</p>
          </div>
        ))}
      </div>
      {selectedSubjectIndex !== null && (
          <div>
          {subjectsData[selectedSubjectIndex].subinfo.map((module, moduleIndex) => (
            <div key={moduleIndex} className="mb-4">
              <h3 className="text-lg font-bold mb-2">{module.module}</h3>
              <table className="table w-fitcontent tablecontent">
                <thead>
                  <tr>
                    <th className="px-1 py-1 ">Subunit</th>
                    <th className="px-1 py-1 ">Hours Allotted</th>
                    <th className="px-1 py-1">Date Commencement</th>
                    <th className="px-1 py-1">Date Completion</th>
                  </tr>
                </thead>
                <tbody>
                  {module.subunits.map((subunit, subunitIndex) => (
                    <tr key={subunitIndex} className="hover:bg-lime-200">
                      <td className="border px-1 py-1">{subunit.subunit}</td>
                      <td className="border px-1 py-1">{subunit.hours_allotted}</td>
                      <td className="border px-1 py-1">{subunit.date_commencement}</td>
                      <td className="border px-1 py-1">{subunit.date_completion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <button className="button" onClick={()=>window.location.href = `/api/subjects/generateLesson/${subjectsData[selectedSubjectIndex].sub_code}`}>Download Lesson Plan</button>
        </div>
      )}
      
    </div>
  );
};

const EditSubjectPage = ({ subject, onClose }) => {
  // Add your edit functionality here

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Edit Subject</h1>
      {/* Display subject details for editing */}
      <pre>{JSON.stringify(subject, null, 2)}</pre>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};
export default MySubs;
