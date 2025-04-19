const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Enable CORS

dotenv.config();

const app = express();
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.error("MongoDB Connection Error:", err));
app.use(cors()); // Allow all origins

// Routes
// app.use("/api/analyze", require("../routes/analysisRoutes")); // Image analysis
app.use("/api/analyze", require("../routes/analysisRoutes"));

// const patientRoutes = require("");
// const patientRoutes = require("../routes/patient");
// app.use("/api/patients", patientRoutes);
// server.js
// const patientRoutes = require('../routes/patient');\
const patientRoutes = require('../routes/patient');

app.use('/api/patients', patientRoutes);

app.use("/api/auth", require("../routes/auth"));
app.use("/api/doctors", require("../routes/doctorRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
