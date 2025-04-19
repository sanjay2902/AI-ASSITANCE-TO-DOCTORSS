const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  phone: { type: String, required: true },
  clinicAddress: { type: String, required: false },

  bio: { type: String }, // Short description about the doctor
  qualifications: { type: [String] }, // Array of medical degrees
  profilePicture: { type: String }, // URL for profile image
  availableTimings: { type: String }, // Availability schedule
  createdAt: { type: Date, default: Date.now },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
