import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5500/api/doctor/${id}`)
      .then(response => {
        setDoctor(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (!doctor) return <div className="text-center mt-20 text-red-600">Doctor not found.</div>;

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
        <div className="flex flex-col items-center text-center">
          {doctor.image ? (
            <img
              src={`http://localhost:5500/uploads/${doctor.image}`}
              alt={doctor.name}
              className="w-40 h-52 rounded-lg object-cover mb-6 border"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-purple-100 flex items-center justify-center text-5xl font-bold text-purple-700 mb-6">
              {doctor.name.charAt(0)}
            </div>
          )}
          <h1 className="text-3xl font-bold text-purple-800 mb-2">{doctor.name}</h1>
          <p className="text-gray-600 mb-1">Specialization: {doctor.specialization}</p>
          <p className="text-gray-600 mb-1">Timing: {doctor.timing}</p>
          <p className="text-gray-600 mb-1">Experience: {doctor.yearsOfExperience} years</p>
        </div>
      </div>
    </div>
  );
}
