// routes/patient.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const patientController = require('../controllers/patientController');

// router.post("/add", auth, patientController.addPatient);
router.post('/add', auth, patientController.addPatient);
router.get('/test', (req, res) => {
  res.send('Patient route working!');
});

module.exports = router;
