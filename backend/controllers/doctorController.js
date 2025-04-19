const Doctor = require("../models/Doctor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// exports.registerDoctor = async (req, res) => {
//   const { name, email, password, specialization } = req.body;

//   try {
//     let doctor = await Doctor.findOne({ email });
//     if (doctor) return res.status(400).json({ msg: "Doctor already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     doctor = new Doctor({ name, email, password: hashedPassword, specialization });

//     await doctor.save();

//     const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ msg: "Server Error" });
//   }
// };
// Register a New Doctor
exports.registerDoctor = async (req, res) => {
    try {
        console.log("Received Registration Request:", req.body); // Debugging Line
        const { name, email, password, specialization, experience, phone, clinicAddress, bio, qualifications, profilePicture, availableTimings } = req.body;

        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: "Doctor with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const doctor = new Doctor({
            name,
            email,
            password: hashedPassword,
            specialization,
            experience,
            phone,
            clinicAddress,
            bio,
            qualifications,
            profilePicture,
            availableTimings
        });

        await doctor.save();
        res.status(201).json({ message: "Doctor registered successfully", doctor });

    } catch (error) {
        console.error("Registration Error:", error); // Debugging Line
        res.status(500).json({ message: "Server Error", error });
    }
};

  exports.loginDoctor = async (req, res) => {
    const { email, password } = req.body;

    try {
      const doctor = await Doctor.findOne({ email });
      if (!doctor) return res.status(400).json({ msg: "Doctor not found" });

      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

      res.json({
        token,
        doctorName: doctor.name   // ✅ Include doctor name
      });
      
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
    }
  };
// Get Doctor Profile
exports.getDoctorProfile = async (req, res) => {
    try {
      const doctor = await Doctor.findById(req.doctor.id).select("-password"); // Exclude password from response
      if (!doctor) return res.status(404).json({ message: "Doctor not found" });
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  // Update Doctor Profile
  exports.updateDoctorProfile = async (req, res) => {
    try {
      const updatedData = req.body;
      
      // Prevent password update directly
      if (updatedData.password) {
        updatedData.password = await bcrypt.hash(updatedData.password, 10);
      }
  
      const doctor = await Doctor.findByIdAndUpdate(req.doctor.id, updatedData, { new: true }).select("-password");
      if (!doctor) return res.status(404).json({ message: "Doctor not found" });
  
      res.json({ message: "Profile updated successfully", doctor });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };
