import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar";
import DoctorManagement from "./Components/DoctorManagement";
import AppointmentManagement from "./Components/AppointmentManagement";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<DoctorManagement />} />
          <Route path="/appointments" element={<AppointmentManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
