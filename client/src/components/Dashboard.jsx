// Dashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import LinkAll from './LinksAll';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-shrink-0 w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Dashboard</h2>
        {/* <LinkAll/> */}
        <nav>
        <ul>
        <li>
            <Link to="/MySubs" className="text-blue-500 hover:text-blue-600">
              MySubjects
            </Link>
          </li>
          <li>
            <Link to="/attend" className="text-blue-500 hover:text-blue-600">
              Attendence
            </Link>
          </li>
          <li>
            <Link to="/timetable" className="text-blue-500 hover:text-blue-600">
              Timetable
            </Link>
          </li>
          <li>
            <Link to="/addsub" className="text-blue-500 hover:text-blue-600">
              add subject
            </Link>
          </li>
          <li>
            <Link to="/register" className="text-blue-500 hover:text-blue-600">
              register
            </Link>
          </li>
          {/* Add more links for other components */}
        </ul>
      </nav>
      </div>
      <div className="flex-1">
        {/* Content for the selected route will be rendered here */}
      </div>
    </div>
  );
};

export default Dashboard;