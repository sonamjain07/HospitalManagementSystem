import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  symptoms: [{ 
    type: String 
  }]
}, {
  timestamps: true
});

export default mongoose.model("PatientModel", PatientSchema);
