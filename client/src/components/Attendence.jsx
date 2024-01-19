import React from "react";
import { Transition } from '@headlessui/react';
import { useState,useEffect,useCallback } from "react";
import './styles/header.css'
const NavigationMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="relative">
        {/* Hamburger Icon */}
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open menu</span>
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
  
        {/* Navigation Menu */}
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg z-10">
            {/* Menu Items */}
            <div className="py-1">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About</a>
              {/* Add more menu items as needed */}
            </div>
          </div>
        </Transition>
      </div>
    );
  };
const Header = ()=>{
    return(
        <div className="header">
            <div className="inner">
                <img id="userimg" src="https://api.dicebear.com/7.x/bottts/svg?seed=amaz" alt="server unavailbale" height="75px" width="75px"/>
                <div className="flex flex-col items-start rotobo-text">
                <span>USERNAME</span>
                <span>type</span>
                </div>
            </div>
            <NavigationMenu/>
        </div>
    )
}
function getPast30Days() {
  const today = new Date();
  const past30Days = [];
  for (let i = 0; i < 30; i++) {
    const pastDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    past30Days.push(pastDay);
  }
  return past30Days;
}
const handleDateChange = (e) => {
  let day = e.target.getAttribute("time");
  const frmtdDate = new Date(day);
  return frmtdDate.toLocaleDateString('en-GB');
}
const DateBox = () => {
  let day = getPast30Days();
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = new Date()
  const [active, setActive] = useState(today.toLocaleDateString('en-GB'))
  console.log(active)
  return(
    <>
    <div className="DateBox">
    {day.map((keyname,key) => (
      <div className={`Box ${keyname.toLocaleDateString('en-GB') === active ? 'activeBox' : ''}`} onClick={(e)=>setActive(handleDateChange(e))} id={key} time={keyname}>
        <span className="day">{daysOfWeek[keyname.getDay()]}</span>
        <span className="daynum">{keyname.getDate()}</span>
      </div>
    ))}
    </div>
    <div className="activeStatus">
    <p>Active Date: {active}</p>
  </div>
  </>
  )
}
// const ClassroomGrid = () => {
//   const getInitialTotalStudents = () => {
//     // Adjust the initial number of students based on the screen size
//     return 60;
//   };

//   const initializeStudents = () => {
//     // Initialize the students array with 'present' status initially
//     return Array(getInitialTotalStudents()).fill('present');
//   };

//   const [students, setStudents] = useState(initializeStudents);

//   const handleStudentClick = (index) => {
//     // Toggle the student status (present/absent/onDuty) when clicked
//     setStudents((prevStudents) => {
//       const updatedStudents = [...prevStudents];
//       const statusMapping = {
//         present: 'absent',
//         absent: 'onDuty',
//         onDuty: 'present',
//       };
//       updatedStudents[index] = statusMapping[prevStudents[index]];
//       return updatedStudents;
//     });
//   };

//   useEffect(() => {
//     // Update the number of students when the window is resized
//     const handleResize = () => {
//       setStudents(initializeStudents());
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div className="classroom-grid">
//       {Array.from({ length: Math.ceil(students.length / 3) }).map((_, benchIndex) => (
//         <div key={benchIndex} className="bench">
//           {Array.from({ length: 3 }).map((_, studentIndex) => {
//             const index = benchIndex * 3 + studentIndex;
//             if (index < students.length) {
//               const studentStatus = students[index];
//               return (
//                 <div
//                   key={index}
//                   className={`student-box ${studentStatus}`}
//                   onClick={() => handleStudentClick(index)}
//                 >
//                   Student {index + 1}
//                 </div>
//               );
//             } else {
//               return null; // Render nothing if the seat doesn't exist
//             }
//           })}
//         </div>
//       ))}
//     </div>
//   );
// };
const ClassroomGrid = ({ studentNames }) => {
  const getInitialTotalStudents = () => {
    // Adjust the initial number of students based on the screen size
    return 60;
  };

  const initializeStudents = () => {
    // Initialize the students array with 'present' status initially
    return Array(getInitialTotalStudents()).fill('present');
  };
  const [students, setStudents] = useState(initializeStudents);
  const [confirmationMessage, setConfirmationMessage] = useState([]);
  const [rollNumbersInput, setRollNumbersInput] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('present');

  const handleStudentClick = (index) => {
    // Toggle the student status (present/absent/onDuty) when clicked
    setStudents((prevStudents) => {
      const updatedStudents = [...prevStudents];
      const statusMapping = {
        present: 'absent',
        absent: 'onDuty',
        onDuty: 'present',
      };
      updatedStudents[index] = statusMapping[prevStudents[index]];
      return updatedStudents;
    });
  };

  // const handleRollNumbersChange = (event) => {
  //   setRollNumbersInput(event.target.value);
  //   console.log("rolnum change")
  // };
  const handleRollNumbersChange = useCallback((event) => {
    setRollNumbersInput(event.target.value);
  }, []);
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const applyStatusToSelectedRollNumbers = () => {
    console.log("update issued")
    const rollNumbersArray = rollNumbersInput
      .split(',')
      .map((number) => parseInt(number.trim(), 10));

    setStudents((prevStudents) => {
      const updatedStudents = [...prevStudents];
      rollNumbersArray.forEach((rollNumber) => {
        if (rollNumber >= 1 && rollNumber <= updatedStudents.length) {
          updatedStudents[rollNumber - 1] = selectedStatus;
        }
      });
      return updatedStudents;
    });
    setRollNumbersInput('');
  };
  const getStatusColorClass = (status) => {
    switch (status) {
      case 'present':
        return 'present-color';
      case 'absent':
        return 'absent-color';
      case 'onDuty':
        return 'onDuty-color';
      default:
        return '';
    }
  };
  const handleSave = () => {
    // Initialize categorizedAttendance
    if (!students || students.length === 0) {
      alert("No attendance data to save.");
      return;
    }

    const studentTable = students.reduce((table, status, index) => {
      const rollNumber = index + 1;
      const studentName = studentNames[rollNumber] || `Student ${rollNumber}`;
      table.push({ RollNumber: rollNumber, Name: studentName, Status: status });
      return table;
    }, []);

    // Set the confirmation message with a table
    setConfirmationMessage(studentTable);
    console.log(confirmationMessage)
    document.getElementById('my_modal_4').showModal()

  };

  return (
    <>
    <div className="classroom-grid">
      {Array.from({ length: Math.ceil(students.length / 3) }).map((_, benchIndex) => (
        <div key={benchIndex} className="bench">
          {Array.from({ length: 3 }).map((_, studentIndex) => {
            const index = benchIndex * 3 + studentIndex;
            if (index < students.length) {
              const studentStatus = students[index];
              return (
                <div
                  key={index}
                  className={`student-box ${studentStatus}`}
                  onClick={() => handleStudentClick(index)}
                >
                  Student {index + 1}
                </div>
              );
            } else {
              return null; // Render nothing if the seat doesn't exist
            }
          })}
        </div>))}
        </div>

      <div className="controls">
        <select value={selectedStatus} onChange={handleStatusChange}>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="onDuty">On Duty</option>
        </select>
        <input
          type="text"
          placeholder="Enter roll numbers (e.g., 1, 3, 5)"
          value={rollNumbersInput}
          onInputCapture={handleRollNumbersChange}
        />
        <button onClick={applyStatusToSelectedRollNumbers}>Update</button>
      </div>
      <>
        <button className="btn" onClick={() => handleSave()}>
          Save
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg">Attendence List</h3>
            <p className="py-4">info about class,time and lecturer</p>
            <div className="confirmation-box">
              <p>Confirm and save attendance:</p>
              <table align="center" className="table">
                <thead>
                  <tr>
                    <th>Roll Number</th>
                    <th>Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmationMessage.map((row) => (
                    <tr key={row.RollNumber}>
                      <td>{row.RollNumber}</td>
                      <td>{row.Name}</td>
                      <td className={getStatusColorClass(row.Status)}>{row.Status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button onClick={handleSave}>Confirm</button>
                <button className="btn">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      </>
    </>
  );
};
const sampleStudentNames = {
  1: 'Adithyaa Beegam',
  2: 'Aziz Ansar',
  3: 'Riya Singh',
  4: 'Aarav Kumar',
  5: 'Anika Nair',
  6: 'Aryan Mehta',
  7: 'Aisha Khan',
  8: 'Sidharth Sharma',
  9: 'Shreya Patel',
  10: 'Vivaan Rao',
  11: 'Ananya Gupta',
  12: 'Madhav Iyer',
  13: 'Ritika Mishra',
  14: 'Sohan Das',
  15: 'Priyanka Sarkar',
  16: 'Nikhil Reddy',
  17: 'Sanya Chopra',
  18: 'Yash Desai',
  19: 'Ira Khan',
  20: 'Vedant Shah',
  21: 'Siya Sharma',
  22: 'Om Prakash',
  23: 'Riya Bose',
  24: 'Karan Singh',
  25: 'Kiara Mehta',
  26: 'Ishaan Verma',
  27: 'Meera Sharma',
  28: 'Virat Patel',
  29: 'Avani Shah',
  30: 'Arjun Kumar',
  31: 'Naina Gupta',
  32: 'Dev Iyer',
  33: 'Riya Das',
  34: 'Ayush Roy',
  35: 'Tiya Sarkar',
  36: 'Kabir Khan',
  37: 'Neha Desai',
  38: 'Rohit Shah',
  39: 'Sana Khan',
  40: 'Rahul Kumar',
  41: 'Aditi Gupta',
  42: 'Abhinav Iyer',
  43: 'Riya Das',
  44: 'Ayush Roy',
  45: 'Tiya Sarkar',
  46: 'Kabir Khan',
  47: 'Neha Desai',
  48: 'Rohit Shah',
  49: 'Sana Khan',
  50: 'Rahul Kumar',
  51: 'Aditi Gupta',
  52: 'Abhinav Iyer',
  53: 'Riya Das',
  54: 'Ayush Roy',
  55: 'Tiya Sarkar',
  56: 'Kabir Khan',
  57: 'Neha Desai',
  58: 'Rohit Shah',
  59: 'Sana Khan',
  60: 'Rahul Kumar'
 };
const Attendence = ()=>{
    return(
      <>
        <Header/>
        <DateBox/>
        <ClassroomGrid studentNames={sampleStudentNames}/>
      </>
    )
}
export default Attendence;