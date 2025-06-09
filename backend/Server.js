import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DoctorRoutes from './routes/DoctorRoutes.js';
import PatientRoutes from './routes/PatientRoutes.js';
import AppointmentRoutes from './routes/AppointmentRoutes.js';
import Db from './Config/Db.js';

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files (like PDFs or images)
app.use('/uploads', express.static('uploads'));

// Connect to the database
Db();

// Routes
app.use("/api/doctor", DoctorRoutes);
app.use("/api/patient", PatientRoutes);
app.use("/api/appointment", AppointmentRoutes);
app.use('/uploads', express.static('uploads'));


// 404 Route Handler for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Start the server
const Port = process.env.PORT || 5500;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
