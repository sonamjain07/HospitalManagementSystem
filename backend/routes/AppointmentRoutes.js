import express from "express";
import { getAllAppointments, bookAppointment, approveAppointment, rejectAppointment } from '../Controllers/appointmentController.js';
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Patient routes
router.post('/appointments', verifyToken, bookAppointment); // Patient books appointment


// Admin routes
router.get('/appointments/all', verifyToken, getAllAppointments); // Admin fetches all appointments
router.put("/appointments/:id/approve", verifyToken, approveAppointment);
router.put("/appointments/:id/reject", verifyToken, rejectAppointment);


export default router;
