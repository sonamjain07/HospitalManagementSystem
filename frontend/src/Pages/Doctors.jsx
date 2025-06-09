import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5500/api/doctor')
      .then(response => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch doctors.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <p className="text-xl font-semibold text-purple-700">Loading Doctors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-red-200 to-orange-200">
        <p className="text-xl font-semibold text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">👨‍⚕️ Our Expert Doctors</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="flex flex-col items-center text-center">
                
                {/* Profile Image */}
                {doctor.image ? (
                  <img
                    src={`http://localhost:5500/uploads/${doctor.image}`}
                    alt={doctor.name}
                    className="w-24 h-32 rounded-full object-cover mb-4 border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-purple-700 mb-4">
                    {doctor.name.charAt(0)}
                  </div>
                )}

                <h2 className="text-xl font-semibold text-blue-800">{doctor.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{doctor.specialization}</p>
                <p className="text-sm text-gray-500 mt-1">{doctor.timing}</p>
                <p className="text-sm text-gray-400 mt-1">{doctor.yearsOfExperience} years of experience</p>
                 {/* View More Button */}
                <Link to={`/doctors/${doctor._id}`}>
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded  transition">
                    View More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
