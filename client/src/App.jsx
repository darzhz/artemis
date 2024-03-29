import reactLogo from './assets/ARTEMIS.svg'
import './App.css'
import  Finput from './components/Finput'
import RegistrationForm from './components/RegistrationForm'
import Attendence from './components/Attendence'
import AddSubjectForm from './components/AddSubjectForm'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import { useEffect, useState } from 'react'
import Login from './components/Login'
import MySubs from './components/MySubs'
import utils from './utils/utils'
import sendData from './utils/utils'
import bcrypt from "bcryptjs";
import { useNavigate } from 'react-router-dom'
import Timetable from './components/Timetable'
import Autograb from './components/Autograb'
import Exams from './components/Exam'

function App() {
  const [user, setUser] = useState(null);
  const [role,setRole]  = useState('faculty')
  const navigate = useNavigate();
  const handleLogin = async (credentials) => {
    // Perform login logic (e.g., call server endpoint)
    // If login is successful, update the user state
    let result = await sendData(credentials,'/api/login');
    if(result.success){
      setUser(result.response);
      setRole(result.response.role);
    localStorage.setItem('user',JSON.stringify(result.response))
    return true;
    }
    
  };
  useEffect(() => {
    console.log(user,role);
  }, [user]);
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST", // Adjust the method based on your server's requirements
      });

      if (response.ok) {
        console.log("Logged out successfully");
      } else {
        console.error(
          "Logout failed. Server returned:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
      <>
    <Header user={user} handleLogout={handleLogout} />
      <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path='/login' element={<Timetable/>}/> */}
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/" element={<Dashboard user={user}/>} />
        <Route path="/attend" element={<Attendence/>} />
        <Route path='/timetable' element={<Timetable/>}/>
        <Route path='/exams' element={<Exams/>}/>
        <Route path='/MySubs' element={<MySubs/>}/>
        {role === 'Admin' && (
        <>
          <Route path="/addsub" element={<Autograb />} />
          <Route path="/register" element={<RegistrationForm />} />
        </>
      )}
        {/* Add more routes for other components */}
      </Routes>
     
    </>
  )
}

export default App
