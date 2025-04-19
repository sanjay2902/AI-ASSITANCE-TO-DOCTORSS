const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");

const router = express.Router();

// Doctor Signup (Register)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, specialization, experience, phone, clinicAddress } = req.body;

    let doctor = await Doctor.findOne({ email });
    if (doctor) return res.status(400).json({ message: "Doctor already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    doctor = new Doctor({ name, email, password: hashedPassword, specialization, experience, phone, clinicAddress });

    await doctor.save();
    res.status(201).json({ message: "Doctor registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Doctor Login// Doctor Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });

    if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    res.json({
      token,
      doctorName: doctor.name   // ✅ this is important!
    });
    
    

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
