import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo/Brand Name */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-2xl md:text-3xl font-extrabold text-white hover:text-yellow-400 transition duration-300 ease-in-out">
            Travel Agency
          </Link>
        </div>

        {/* Menu Toggle Button (Mobile) */}
        <div className="md:hidden">
          <button
            className="text-white p-2 rounded-md focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-lg font-medium hover:text-yellow-300 transition duration-300">
            Home
          </Link>
          <Link to="/booking" className="text-lg font-medium hover:text-yellow-300 transition duration-300">
            Bookings
          </Link>
          <Link to="/admin" className="text-lg font-medium hover:text-yellow-300 transition duration-300">
            Admin Panel
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 text-white space-y-4 px-4 py-2">
          <Link
            to="/"
            className="block text-lg font-medium hover:text-yellow-300 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/booking"
            className="block text-lg font-medium hover:text-yellow-300 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Bookings
          </Link>
          <Link
            to="/admin"
            className="block text-lg font-medium hover:text-yellow-300 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Admin Panel
          </Link>
        </div>
      )}
    </nav>
  );
};


export default Navbar;
