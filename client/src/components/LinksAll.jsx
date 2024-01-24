import React from "react"
import { Link } from 'react-router-dom';
const LinkAll = () => {
    return (
        <>
        <nav>
        <ul>
          <li>
            <Link to="/attend" className="text-blue-500 hover:text-blue-600">
              Attendence
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
          <li>
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
              logout
            </Link>
          </li>
          {/* Add more links for other components */}
        </ul>
      </nav>
      </>
    )
}
export default LinkAll;