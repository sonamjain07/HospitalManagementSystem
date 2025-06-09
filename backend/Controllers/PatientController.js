import PatientModel from "../Models/PatientModel.js";  // Adjust the path as necessary
import AppointmentModel from "../Models/AppointmentModel.js";

// PatientController.js
export function getMyProfile(req, res) {
  const patientId = req.user.id; // Extract the user ID from the token (attached by verifyToken middleware)

  PatientModel.findById(patientId)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      res.status(200).json({
        id: patient._id,
        name: patient.name,
        email: patient.email,
        symptoms: patient.symptoms, // Add other fields if needed
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching profile", error });
    });
}


export function getAllPatients(req, res) {
  PatientModel.find() // Get all patients
    .then((patients) => {
      if (!patients.length) {
        return res.status(404).json({ message: "No patients found." });
      }
      res.status(200).json(patients); // Send patients data
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching patients", error });
    });
}



export function getAppointmentHistory(req, res) {
  const patientId = req.user.id; // Extract user id from the token

  AppointmentModel.find({ patient: patientId })
    .then((appointments) => {
      if (!appointments.length) {
        return res.status(404).json({ message: "No appointments found." });
      }
      res.status(200).json(appointments);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching appointment history", error });
    });
}