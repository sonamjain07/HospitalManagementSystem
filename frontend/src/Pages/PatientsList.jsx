import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(5); // Show 5 patients per page

  // Fetch patients from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5500/api/patient")
      .then((response) => {
        setPatients(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch patients");
        console.error("Error fetching patients:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Get current patients for the current page
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-6 ">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-12">
          Patient List
        </h1>

        {loading ? (
          <p className="text-center text-xl text-teal-600">
            Loading patients...
          </p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="space-y-8">
            {currentPatients.map((patient) => (
              <div
                key={patient._id}
                className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-all"
              >
                <h2 className="text-2xl font-semibold  text-purple-600">
                  {patient.name}
                </h2>
                <p className="text-lg text-gray-700">
                  <strong>Email:</strong> {patient.email}
                </p>
                {/* <p className="text-lg text-gray-700">
                  <strong>Symptoms:</strong> {patient.symptoms.join(", ")}
                </p> */}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {/* <div className="flex justify-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * patientsPerPage >= patients.length}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
}
