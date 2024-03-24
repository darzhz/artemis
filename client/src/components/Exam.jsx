//we need a exam component to add exam details and exam timetable and add marks of students in a particular class or set of students

import React from "react";
import { useState, useEffect } from "react";
import "./styles/exam.css";
const Exams = () => {
  return (
    <>
      <TabbedLayout />
    </>
  );
};
const TabbedLayout = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const handleNewTab = () => {
    setShowForm(!showForm);
    setActiveTab(tabs.length+1);
  };
  //write a function to fetch existing exams from the database
  useEffect(() => {
    const fetchExams = async () => {
      const exams = await fetch("/api/exam/getExamByStatus/1");
      const data = await exams.json();
      console.log(exams);
      setTabs(data);
    };
   
    fetchExams();
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setShowForm(false);
  };
   //write a function to add the exam details to the database
   const addExam = async (formData) => {
    const storedUser = localStorage.getItem("user");
    const userloc = storedUser ? JSON.parse(storedUser) : null;
    formData.faculty_id = userloc.user_id;

    const response = await fetch("/api/exam/addExam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleAddTab = (formData) => {
    setTabs([...tabs, formData]);
    setActiveTab(tabs.length);
  };

  return (
    <div className="tabbed-layout">
      <div className="tabs-vertical">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-vertical ${activeTab === index ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.exam_name}
          </div>
        ))}
          <div className={`add tab-vertical ${showForm === true ? "active" : ""}`} onClick={()=> handleNewTab()}><span>New Exam</span></div>
        <div className="tab-vertical add-tab">
        </div>
      </div>
      <div className="tab-content">
        {tabs.length > 0 && (
          <div>
            <h2></h2>
            <ExamConfigurationForm onSubmit={addExam}
            tabs={tabs}
            activeTab={activeTab} prefill={tabs[activeTab]}/>
          </div>
        )}
      </div>
    </div>
  );
};

const ExamConfigurationForm = ({ onSubmit, tabs, activeTab,prefill }) => {
  const [formData, setFormData] = useState({
    exam_name: "",
    maxMarks: "",
    minMarks: "",
    passMarks: "",
    examDate: new Date(),
    sub_code: "",
    deptid: "",
    classid: "",
  });
  const [classes, setClasses] = useState([]);
  const [departments, setDepartments] = useState([]); 
  const [students, setStudents] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert value to the appropriate type if necessary
    const parsedValue = name === "classid" || name === "deptid" ? parseInt(value) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  //function to prefill the form with the existing exam details from the data in prefill is available
  useEffect(() => { 
    if(prefill){
      setFormData(prefill);
    }else{
      setFormData({
        exam_name: "",
        maxMarks: "",
        minMarks: "",
        passMarks: "",
        examDate: new Date(),
        sub_code: "",
        deptid: "",
        classid: "",
      });
    }
  }, [prefill]);
  useEffect(() => {
     //fetch the list of classes and departments to prefill the form
     const fetchClasses = async () => {
      const classes = await fetch("/api/class/getAllClasses");
      const data = await classes.json();
      console.log(classes);
      setClasses(data);
    };
    const fetchDepartments = async () => {
      const departments = await fetch("/api/department/getAllDepartments");
      const data = await departments.json();
      console.log(departments);
      setDepartments(data);
    };
    const fetchStudentsByClass = async () => {
      const students = await fetch(`/api/student/getStudentsByClass/${formData.classid}`);
      const data = await students.json();
      console.log(students);
      setStudents(data.students);
    }
    fetchClasses();
    fetchDepartments();
      fetchStudentsByClass();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      exam_name: "",
      maxMarks: "",
      minMarks: "",
      passMarks: "",
      examDate: new Date(),
      sub_code: "",
      deptid: "",
      classid: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Exam Name</span>
          </label>
          <input
            type="text"
            name="exam_name"
            value={formData.exam_name}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Max Marks</span>
          </label>
          <input
            type="number"
            name="maxMarks"
            value={formData.maxMarks}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Min Marks</span>
          </label>
          <input
            type="number"
            name="minMarks"
            value={formData.minMarks}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pass Marks</span>
          </label>
          <input
            type="number"
            name="passMarks"
            value={formData.passMarks}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Exam Date</span>
          </label>
          <input
            type="date"
            name="examDate"
            value={formData.examDate}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Subject Code</span>
          </label>
          <input
            type="text"
            name="sub_code"
            value={formData.sub_code}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
        <label className="label">
          <span className="label-text">Class ID</span>
        </label>
        <select name="classid" value={formData.classid} onChange={handleChange}>
          <option value="">Select a class</option>
          {classes.map((cls, index) => (
            <option key={index} value={cls.class_id.toString()}>
              {cls.class_name +" - "+ cls.class_id}
            </option>
          ))}
        </select>
      </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Department ID</span>
          </label>
          <select name="deptid" value={formData.deptid} onChange={handleChange}>
            <option value="">Select a department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept.deptid}>
                {dept.dept_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
     //show a form to enter the mark of the list of students in a table form please add here
     <h3>Enter Marks for Students:</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>
                  <input
                    type="number"
                    name={`marks-${student.id}`} // Unique name for each input
                    value={formData[`marks-${student.id}`] || ""}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>


      </>
      );
};
export default Exams;
