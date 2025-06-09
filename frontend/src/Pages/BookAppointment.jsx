import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDoctorObj, setSelectedDoctorObj] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentStatus, setAppointmentStatus] = useState("Pending");
  const [symptoms, setSymptoms] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5500/api/doctor")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setError("Failed to fetch doctors");
      });
  }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!selectedDoctor || !appointmentDate || !appointmentTime || !appointmentStatus || !symptoms) {
    setError("All fields are required.");
    return;
  }

  setLoading(true);
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      "http://localhost:5500/api/appointment/appointments",
      {
        doctorId: selectedDoctor,
        date: appointmentDate,
        time: appointmentTime,
        status: appointmentStatus,  
        symptoms: symptoms,
      },
      config
    );

    if (response.data) {
      setLoading(false);
      alert("Appointment booked successfully!");

      // Clear all form fields here
      setSelectedDoctor("");
      setSelectedDoctorObj(null);
      setAppointmentDate("");
      setAppointmentTime("");
      setAppointmentStatus("Pending");
      setSymptoms("");
      setError("");
    }
  } catch (err) {
    setError(err.response?.data?.message || "Failed to book appointment");
    setLoading(false);
  }
};




  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-10">
          Book Your Appointment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select Doctor
            </label>
            <select
              value={selectedDoctor}
              onChange={(e) => {
                const selectedId = e.target.value;
                setSelectedDoctor(selectedId);
                const doc = doctors.find((d) => d._id === selectedId);
                setSelectedDoctorObj(doc);
              }}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select a Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Appointment Date
            </label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Appointment Time
            </label>
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
              placeholder={selectedDoctorObj?.timing || "Enter time"}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

           <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Status
            </label>
            <input
              type="status"
              value={appointmentStatus}
              onChange={(e) => setAppointmentStatus(e.target.value)}
              required
              placeholder="Pending"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Symptoms
            </label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe your symptoms..."
              required
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold py-3 rounded-lg transition duration-300 ease-in-out"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}
