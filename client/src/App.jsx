import reactLogo from './assets/ARTEMIS.svg'
import './App.css'
import  Finput from './components/Finput'
import RegistrationForm from './components/RegistrationForm'
import Attendence from './components/Attendence'
import AddSubjectForm from './components/AddSubjectForm'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import { useState } from 'react'
import Login from './components/Login'
import MySubs from './components/MySubs'

function App() {
  const [user, setUser] = useState(null);
  const handleLogin = (credentials) => {
    // Perform login logic (e.g., call server endpoint)
    // If login is successful, update the user state
    setUser({ username: credentials.username });
    localStorage.setItem('user',JSON.stringify({ username: credentials.username }))
    return true;
  };
  const handleLogout = () => {
    // Perform logout logic (e.g., call server logout endpoint)
    // Update the user state to null
    console.log("logged out")
    localStorage.removeItem('user');
    setUser(null);
  };
  return (
      <>
    <Header user={user} handleLogout={handleLogout}/>
      <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/" element={<Dashboard/>} />
        <Route path="/attend" element={<Attendence/>} />
        <Route path="/addsub" element={<AddSubjectForm/>} />
        <Route path="/register" element={<RegistrationForm/>} />
        <Route path='/MySubs' element={<MySubs/>}/>
        {/* Add more routes for other components */}
      </Routes>
    </>
  )
}

export default App
