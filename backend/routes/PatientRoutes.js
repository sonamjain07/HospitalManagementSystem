import express from "express";
import { registerPatient, loginPatient , logout } from "../Controllers/AuthController.js";
import { getMyProfile } from "../Controllers/PatientController.js";
import protect from "../middlewares/authMiddleware.js";
// import { verifyToken } from '../middlewares/authMiddleware.js'; // Adjust path as needed
import { getAllPatients } from '../Controllers/PatientController.js';



const router = express.Router();

router.get('/', getAllPatients);
router.post("/register", registerPatient);
router.post("/login", loginPatient);
router.post('/logout', logout);
router.get("/me", protect, getMyProfile); 
// router.get('/profile', verifyToken, getMyProfile); // Apply token verification middleware


export default router;
