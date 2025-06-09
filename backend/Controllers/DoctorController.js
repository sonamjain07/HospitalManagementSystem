import DoctorModel from "../Models/DoctorModel.js";

export  async function getDoctor(req, res) {
    try {
      let Doctor = await DoctorModel.find();
      res.status(200).json(Doctor);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  }

  

  export async function getDoctorById(req, res) {
    try {
      let Doctor = await DoctorModel.findById(req.params.id);
      res.status(200).json(Doctor);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  }
  

  // Function to handle adding a new doctor
export async function postDoctor(req, res) {
  try {
    const { name, specialization, timings, yearsOfExperience } = req.body;

    // File check
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Field validation
    if (!name || !specialization || !timings || !yearsOfExperience) {
      return res.status(400).json({
        message: "All fields (name, specialization, timings, yearsOfExperience) are required.",
      });
    }

    const newDoctor = new DoctorModel({
      image: req.file.filename,
      name,
      specialization,
      timings,
      yearsOfExperience,
    });

    await newDoctor.save();

    res.status(201).json({ message: "Doctor added successfully", doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ message: "Failed to add doctor", error });
  }
}

  
  

  export async function deleteDoctor(req, res) 
{
    try {
        let Doctor = await DoctorModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Doctor deleted successfully", deleted: Doctor });
    }
     catch (e)
      {
        res.status(400).json(e);
    }
}


export async function updateDoctor(req, res)

 {
    try {
        let Doctor = await DoctorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Doctor updated successfully", updated: Doctor });
    } 
    catch (e)
     {
        res.status(400).json(e);
    }
}