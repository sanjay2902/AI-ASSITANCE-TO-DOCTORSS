const express = require("express");
const { registerDoctor, loginDoctor } = require("../controllers/doctorController");
const { getDoctorProfile, updateDoctorProfile } = require("../controllers/doctorController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerDoctor);
router.post("/login", loginDoctor);
router.get("/profile", authMiddleware, getDoctorProfile);
// router.put("/update", authMiddleware, updateDoctorProfile);
// const { protect } = require("../middleware/authMiddleware");

router.put("/update", authMiddleware, updateDoctorProfile);

// router.put("/update", authMiddleware,);
module.exports = router;
