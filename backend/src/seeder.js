require("dotenv").config();
const mongoose = require("mongoose");
const Doctor = require("../models/Doctor");
const connectDB = require("../config/db");

// Connect to database
connectDB();

// Sample doctor data
const doctors = [
  {
    name: "Dr. John Doe",
    email: "john.doe@example.com",
    password: "hashedpassword",
    specialization: "Cardiologist",
    experience: 10,
    phone: "9876543210",
    clinicAddress: "123 Heart Street, NY",
  },
  {
    name: "Dr. Jane Smith",
    email: "jane.smith@example.com",
    password: "hashedpassword",
    specialization: "Dermatologist",
    experience: 8,
    phone: "8765432109",
    clinicAddress: "456 Skin Avenue, CA",
  },
];

// Function to insert data
const insertData = async () => {
  try {
    await Doctor.deleteMany(); // Clears existing data
    await Doctor.insertMany(doctors);
    console.log("Sample doctors inserted successfully! ✅");
    process.exit();
  } catch (error) {
    console.error("Error inserting data:", error);
    process.exit(1);
  }
};

// Run seeder
insertData();
