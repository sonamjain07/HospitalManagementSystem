import AppointmentModel from '../Models/AppointmentModel.js';
import DoctorModel from '../Models/DoctorModel.js'; 


// Book an appointment
export const bookAppointment = async (req, res) => {
  const { doctorId, date, time, symptoms } = req.body;

  if (!doctorId || !date || !time || !symptoms) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const appointment = new AppointmentModel({
    patientId: req.user.id,
    doctorId,
    date,
    time,
    symptoms,
    status: 'pending',
  });

  try {
  await appointment.save();
  res.status(201).json({ message: 'Appointment booked successfully' });
} catch (err) {
  console.error("❌ Error saving appointment:", err.message);
  res.status(500).json({ message: 'Failed to save appointment' });
}
};


// Get appointment history for the patient
export const getAllAppointments = async (req, res) => {
  try {
    const patientId = req.user.id;
    const appointments = await AppointmentModel.find({ patientId }).populate('doctorId', 'name specialization');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};








// // Approve an appointment (admin)
export function approveAppointment(req, res) {
  const appointmentId = req.params.id;

  AppointmentModel.findByIdAndUpdate(appointmentId, { status: 'Approved' }, { new: true })
    .then((updatedAppointment) => {
      if (!updatedAppointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      res.status(200).json({ message: 'Appointment approved', appointment: updatedAppointment });
    })
    .catch((error) => res.status(500).json({ message: 'Error approving appointment', error }));
}

// Update appointment status (approve or reject)
export const updateAppointmentStatus = async (req, res) => {
  const appointmentId = req.params.id;
  const { status } = req.body;

  // Validate status
  const allowedStatuses = ["approved", "rejected"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: `Appointment ${status}`,
      appointment: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment status", error });
  }
};



// Reject an appointment (admin)
export function rejectAppointment(req, res) {
  const appointmentId = req.params.id;

  AppointmentModel.findByIdAndUpdate(
    appointmentId,
    { status: 'rejected' }, // lowercase
    { new: true }
  )
    .then((updatedAppointment) => {
      if (!updatedAppointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      res.status(200).json({ message: 'Appointment rejected', appointment: updatedAppointment });
    })
    .catch((error) => res.status(500).json({ message: 'Error rejecting appointment', error }));
}
