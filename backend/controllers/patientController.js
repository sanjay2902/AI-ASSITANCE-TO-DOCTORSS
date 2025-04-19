const Patient = require("../models/Patient");

// Add new patient
exports.addPatient = async (req, res) => {
  try {
    const doctorName = req.doctor.name; // comes from middleware
    const patientData = { ...req.body, doctor: doctorName };

    const newPatient = new Patient(patientData);
    await newPatient.save();

    res.status(201).json({ message: "Patient added successfully", patient: newPatient });
  } catch (error) {
    res.status(500).json({ message: "Error adding patient", error });
  }
};

// Get patients by logged-in doctor
exports.getPatients = async (req, res) => {
  try {
    const doctorName = req.doctor.name;
    const patients = await Patient.find({ doctor: doctorName });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error });
  }
};
