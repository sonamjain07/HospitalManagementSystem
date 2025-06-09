import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    image: null,
    name: "",
    specialization: "",
    timings: "",
    yearsOfExperience: "",
  });
  const [editingDoctor, setEditingDoctor] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/doctor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const handleAddDoctor = async () => {
    try {
      const formData = new FormData();
      formData.append("image", newDoctor.image);
      formData.append("name", newDoctor.name);
      formData.append("specialization", newDoctor.specialization);
      formData.append("timings", newDoctor.timings);
      formData.append("yearsOfExperience", newDoctor.yearsOfExperience);

      await axios.post("http://localhost:5500/api/doctor", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setNewDoctor({
        image: null,
        name: "",
        specialization: "",
        timings: "",
        yearsOfExperience: "",
      });

      fetchDoctors();
    } catch (err) {
      console.error("Error adding doctor:", err);
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/api/doctor/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDoctors();
    } catch (err) {
      console.error("Error deleting doctor:", err);
    }
  };

  const handleUpdateDoctor = async () => {
    try {
      const formData = new FormData();

      formData.append("name", editingDoctor.name);
      formData.append("specialization", editingDoctor.specialization);
      formData.append("timings", editingDoctor.timings);
      formData.append("yearsOfExperience", editingDoctor.yearsOfExperience);

      // Only add image if it's a File (i.e., updated)
      if (editingDoctor.image instanceof File) {
        formData.append("image", editingDoctor.image);
      }

      await axios.put(
        `http://localhost:5500/api/doctor/${editingDoctor._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEditingDoctor(null);
      fetchDoctors();
    } catch (err) {
      console.error("Error updating doctor:", err);
    }
  };

  return (

      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-5">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
         Manage Doctors
        </h2>

        {/* Add New Doctor */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Name"
            value={newDoctor.name}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, name: e.target.value })
            }
            className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Specialization"
            value={newDoctor.specialization}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, specialization: e.target.value })
            }
            className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Timings"
            value={newDoctor.timings}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, timings: e.target.value })
            }
            className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Years of Experience"
            value={newDoctor.yearsOfExperience}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, yearsOfExperience: e.target.value })
            }
            className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, image: e.target.files[0] })
            }
            className="col-span-full border px-3 py-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddDoctor}
            className="col-span-full bg-purple-600 text-white font-semibold py-2 rounded transition duration-300"
          >
            Add Doctor
          </button>
        </div>

        {/* Doctor List */}
        <ul className="space-y-4">
          {doctors.map((doctor) => (
            <li
              key={doctor._id}
              className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              {editingDoctor?._id === doctor._id ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full">
                  <input
                    type="text"
                    value={editingDoctor.name}
                    onChange={(e) =>
                      setEditingDoctor({
                        ...editingDoctor,
                        name: e.target.value,
                      })
                    }
                    className="border px-2 py-1 rounded"
                  />
                  <input
                    type="text"
                    value={editingDoctor.specialization}
                    onChange={(e) =>
                      setEditingDoctor({
                        ...editingDoctor,
                        specialization: e.target.value,
                      })
                    }
                    className="border px-2 py-1 rounded"
                  />
                  <input
                    type="text"
                    value={editingDoctor.timings}
                    onChange={(e) =>
                      setEditingDoctor({
                        ...editingDoctor,
                        timings: e.target.value,
                      })
                    }
                    className="border px-2 py-1 rounded"
                  />
                  <input
                    type="number"
                    value={editingDoctor.yearsOfExperience}
                    onChange={(e) =>
                      setEditingDoctor({
                        ...editingDoctor,
                        yearsOfExperience: e.target.value,
                      })
                    }
                    className="border px-2 py-1 rounded"
                  />

                  {/* ✅ New image upload input */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setEditingDoctor({
                        ...editingDoctor,
                        image: e.target.files[0],
                      })
                    }
                    className="col-span-full border px-2 py-1 rounded"
                  />

                  <div className="flex gap-2 mt-2 md:mt-0 col-span-full">
                    <button
                      onClick={handleUpdateDoctor}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingDoctor(null)}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-4">
                    {doctor.image && (
                      <img
                        src={`http://localhost:5500/uploads/${doctor.image}`}
                        alt={doctor.name}
                        className="w-24 h-32 object-cover rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-lg">
                        {doctor.name}{" "}
                        <span className="text-sm text-gray-500">
                          ({doctor.specialization})
                        </span>
                      </p>
                      <p className="text-sm text-gray-700">{doctor.timings}</p>
                      <p className="text-sm text-gray-700">
                        Experience: {doctor.yearsOfExperience} yrs
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 md:mt-0">
                    <button
                      onClick={() => setEditingDoctor(doctor)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDoctor(doctor._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
  );
};

export default DoctorManagement;
