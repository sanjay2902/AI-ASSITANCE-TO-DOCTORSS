import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post("http://localhost:8000/chat", {
      question: message,
      context: "Provide medical advice or explanation based on this context.",
    });
    res.json({ reply: response.data.answer });
  } catch (error) {
    console.error("Error from model:", error.message);
    res.status(500).json({ error: "Internal error" });
  }
});

app.listen(5000, () => console.log("Express backend running on http://localhost:5000"));
