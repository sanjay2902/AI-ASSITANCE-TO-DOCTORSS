const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String,
  disease: String,
  treatment: String,
  lastVisit: Date,
  doctor: { type: String, required: true }, // store doctor's name
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);
