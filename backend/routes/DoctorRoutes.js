import { Router } from "express";
import upload from "../middlewares/upload.js";

import {
    getDoctor,
    getDoctorById,
    postDoctor,
    deleteDoctor,
    updateDoctor,
} from "../Controllers/DoctorController.js";


let router = Router();

router.get("/",getDoctor);
router.get("/:id",getDoctorById);
router.post("/", upload.single('image'),postDoctor);
router.delete("/:id", deleteDoctor);      
router.put("/:id", updateDoctor); 


export default router;
