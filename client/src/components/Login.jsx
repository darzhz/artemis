import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import Logo from './../assets/ARTEMIS.svg'; 
const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      // Perform login logic
      const success = await handleLogin({ username, password });
  
      if (success) {
        // Redirect to dashboard or desired page on successful login
        navigate('/');
      } else {
        // Show error message
        setShowError(true);
      }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-theme bg-gradient-to-t">
        <div className="w-full max-w-md p-8 space-login-card bg bg-slate-600 rounded-xl">
          <img src={Logo} height="75px" alt="artemis" className="mx-auto w-20" />
  
          <form onSubmit={handleFormSubmit} className="space-login-form">
            <div className="mb-6">
              <label className="block text-white text-sm font-semibold mb-2">Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
  
            <div className="mb-6">
              <label className="block text-white text-sm font-semibold mb-2">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
  
            {showError && (
              <p className="text-red-500 text-sm mb-4">
                Incorrect username or password. Please try again.
              </p>
            )}
  
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };
  export default Login;