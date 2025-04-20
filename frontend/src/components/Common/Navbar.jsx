import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <header 
        className="shadow-md" 
        style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand Name */}
            <div className="flex-grow flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="https://cdn-icons-png.flaticon.com/128/187/187868.png" 
                  alt="TeechTrack Logo" 
                  className="h-10 w-10" // Same size for all screens now
                />
                <span className="text-2xl font-bold ml-3" style={{ color: 'var(--text-color)' }}>
                  TeechTrack
                </span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-3 md:space-x-4">
              <Link 
                to="/login" 
                className="text-base font-medium border border-green-500 rounded-lg px-3 py-1.5 md:px-4 md:py-2 transition duration-300 hover:opacity-80"
                style={{ color: 'var(--link-color)' }}
              >
                Login
              </Link>

              <Link 
                to="/signup" 
                className="text-base font-medium px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition duration-300 hover:opacity-80"
                style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)' }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Divider Line */}
      <div 
        className="w-full border-b" 
        style={{ borderColor: 'var(--border-color)' }}
      ></div>
    </>
  );
};

export default Navbar;