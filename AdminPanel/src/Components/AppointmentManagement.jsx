import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AppointmentManage() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios
      .get("http://localhost:5500/api/appointment/appointments/all", config)
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch appointments");
      });
  };

  // Function to update status: "approved" or "rejected"
  const updateStatus = (id, status) => {
    const url =
      status === "approved"
        ? `http://localhost:5500/api/appointment/appointments/${id}/approve`
        : `http://localhost:5500/api/appointment/appointments/${id}/reject`;

    axios
      .put(url, {}, config)
      .then((response) => {
        // Update the local state so UI updates immediately
        setAppointments((prev) =>
          prev.map((apt) =>
            apt._id === id ? { ...apt, status: status } : apt
          )
        );
      })
      .catch((err) => {
        console.error("Status update failed", err);
        setError("Failed to update appointment status");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-purple-700 mb-8 text-center">
          Booked Appointments
        </h2>

        {error && (
          <p className="text-center text-red-600 mb-6 font-medium">{error}</p>
        )}

        {appointments.length === 0 ? (
          <p className="text-center text-gray-500">No appointments found.</p>
        ) : (
          <ul className="space-y-6">
            {appointments.map((apt) => (
              <li
                key={apt._id}
                className="border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-purple-600 mb-2">
                  Dr. {apt.doctorId?.name || "N/A"}
                </h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Specialization:</span>{" "}
                  {apt.doctorId?.specialization || "N/A"}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(apt.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Time:</span>{" "}
                  {new Date(`2000-01-01T${apt.time}`).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Symptoms:</span>{" "}
                  {apt.symptoms || "N/A"}
                </p>

                <div className="flex space-x-4">
                  <button
                    onClick={() => updateStatus(apt._id, "approved")}
                    disabled={apt.status === "approved" || apt.status === "rejected"}
                    className={`px-4 py-2 rounded-md text-white font-semibold ${
                      apt.status === "approved"
                        ? "bg-green-600 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {apt.status === "approved" ? "Approved" : "Approve"}
                  </button>

                  <button
                    onClick={() => updateStatus(apt._id, "rejected")}
                    disabled={apt.status === "approved" || apt.status === "rejected"}
                    className={`px-4 py-2 rounded-md text-white font-semibold ${
                      apt.status === "rejected"
                        ? "bg-red-600 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {apt.status === "rejected" ? "Rejected" : "Reject"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
