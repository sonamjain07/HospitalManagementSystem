import React, { useState } from "react";
import { Search, User, Calendar, Menu, X, HomeIcon, List, LogOut } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-teal-600 to-blue-600 text-white font-sans shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-left">
            <span className="font-bold font-sans text-xl md:text-2xl flex items-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              MediCare
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/home"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-700 transition duration-150 flex items-center"
            >
              <HomeIcon className="h-4 w-4 mr-1" />
              Home
            </a>
            <a
              href="/doctors"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-700 transition duration-150 flex items-center"
            >
              <User className="h-4 w-4 mr-1" />
              Doctors
            </a>
            <a
              href="/book-appointment"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-700 transition duration-150 flex items-center"
            >
              <Calendar className="h-4 w-4 mr-1" />
              Book Appointment
            </a>
            <a
              href="/patient-list"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-700 transition duration-150 flex items-center"
            >
              <List className="h-4 w-4 mr-1" />
              Patient List
            </a>
          </div>

          {/* Authentication Links (Login, Signup in the corner) */}
          <div className="hidden md:flex items-center ml-auto space-x-2">
            <a
              href="/login"
              className="text-sm px-3 py-1 rounded border border-teal-300 hover:bg-teal-700 transition duration-150"
            >
              Login
            </a>
            <a
              href="/"
              className="text-sm px-3 py-1 rounded bg-white text-teal-800 hover:bg-teal-100 transition duration-150"
            >
              Signup
            </a>
            <a
              href="/logout"
              className="text-sm p-2 rounded bg-white text-red-800 hover:bg-red-100 transition duration-150"
            >
              <LogOut size={20} />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-teal-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700"
            >
              Home
            </a>
            <a
              href="/doctors"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700"
            >
              Doctors
            </a>
            <a
              href="/book-appointment"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700"
            >
              Book Appointment
            </a>
            <a
              href="/contact-us"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Search */}
          <div className="px-2 py-2">
            <div className="flex items-center bg-teal-700 rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search Doctor"
                className="py-1 px-3 text-sm bg-teal-700 text-white placeholder-white focus:outline-none flex-grow"
              />
              <button className="p-2 text-teal-200 hover:text-white focus:outline-none">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Mobile Authentication */}
          <div className="pt-2 pb-3 border-t border-teal-600">
            <div className="flex items-center justify-between px-2">
              <a
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700"
              >
                Login
              </a>
              <a
                href="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium bg-white text-teal-800 hover:bg-teal-100"
              >
                Signup
              </a>
            </div>
            <a
              href="/patient-dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700"
            >
              Patient Dashboard
            </a>
            <a
              href="/admin-dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700"
            >
              Admin Dashboard
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
