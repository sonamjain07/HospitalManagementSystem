import React from "react";
import { Link } from "react-router-dom";
import { FaUserMd, FaCalendarAlt, FaHospitalAlt } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <FaHospitalAlt className="text-3xl" />
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-8 text-lg font-medium">
          <li className="flex items-center gap-2 hover:text-teal-300 transition-colors duration-200">
            <FaUserMd />
            <Link to="/doctors">Manage Doctors</Link>
          </li>
          <li className="flex items-center gap-2 hover:text-teal-300 transition-colors duration-200">
            <FaCalendarAlt />
            <Link to="/appointments">Manage Appointments</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
