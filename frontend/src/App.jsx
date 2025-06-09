import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';  // Assuming Navbar is in a separate file

// Import page components (these are placeholders for now)
import Home from './Pages/Home';
import Doctors from './Pages/Doctors';
import BookAppointment from './Pages/BookAppointment';
import PatientList from './Pages/PatientsList'; 
import DoctorDetail from './Pages/DoctorDetail';  
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Logout from './Pages/Logout';


export default function App() {
  return (
    <Router>
      <NavBar /> {/* Render Navbar in the app */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/patient-list" element={<PatientList/>} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}
