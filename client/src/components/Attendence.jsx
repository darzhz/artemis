import React from "react";
import { Transition } from '@headlessui/react';
import { useState } from "react";
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
const Attendence = ()=>{
    return(
        <Header/>
    )
}
export default Attendence;