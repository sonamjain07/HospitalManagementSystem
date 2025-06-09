import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
   name: {
    type: String,
    required: true,
    trim: true
  },
  specialization: {
    type: String,
    required: true,
    trim: true
  },
  timings: {
    type: String,
    required: true,
    trim: true
  },
  yearsOfExperience: {
    type: Number, // The type is Number for years of experience
    required: true, // Making it required, or you can set it to false if not necessary
  }
}, 
{
  timestamps: true
});

export default mongoose.model('DoctorModel', DoctorSchema);
