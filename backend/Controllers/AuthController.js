import PatientModel from "../Models/PatientModel.js";  // Import the Patient model to interact with the database.
import bcrypt from "bcryptjs";  // Import bcrypt for hashing passwords.
import jwt from "jsonwebtoken";  // Import jwt for creating JSON Web Tokens.

// Register Patient
export async function registerPatient(req, res) {
  const { name, email, password, symptoms } = req.body;

  try {
    const existingPatient = await PatientModel.findOne({ email });

    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newPatient = new PatientModel({
      name,
      email,
      password: hashedPassword,
      symptoms,
    });

    await newPatient.save();

    res.status(201).json({ message: "Patient registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering patient", error: err });
  }
}


// Login Patient
export const loginPatient = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields required' });

  const patient = await PatientModel.findOne({ email });
  if (!patient) return res.status(404).json({ message: 'Patient not found' });

  const isMatch = await bcrypt.compare(password, patient.password);
  if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

  console.log(req.body);

  // Use the secret key from the environment variables for JWT signing
  const token = jwt.sign(
    { id: patient._id, role: 'patient' },
    process.env.JWT_SECRET, // Using the environment variable here
    { expiresIn: '1d' }
  );

  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: patient._id,
      name: patient.name,
      email: patient.email,
    },
  });
};


//logout Patient
export const logout = (req, res) => {
  // If using sessions
  if (req.session) {
    req.session.destroy(err => {
      if (err) return res.status(500).json({ message: "Logout failed" });
      res.clearCookie('connect.sid'); // optional: clear cookie
      return res.status(200).json({ message: "Logged out successfully" });
    });
  } else {
    // If using JWT only
    res.status(200).json({ message: "Logged out from client side" });
  }
};