const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Google Gemini API key from env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });

    // const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageParts = [
      {
        inlineData: {
          data: req.file.buffer.toString("base64"),
          mimeType: req.file.mimetype,
        },
      },
    ];

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            ...imageParts,
            {
                text: `You're a medical expert. Analyze this patient report image and provide:
                1. A clear diagnosis and reasoning.
                2. Possible complications.
                3. Recommended treatments with dosages.
                4. Any red flags or urgent follow-up suggestions.
                5. Simplified explanation for patients (optional).`,
            },
          ],
        },
      ],
    });

    const response = await result.response;
    const text = response.text();
    const formatAsHTML = (text) => {
        return text
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")  // bold
          .replace(/\*(.*?)\*/g, "<em>$1</em>")              // italics
          .replace(/\n/g, "<br/>")                           // new lines
          .replace(/•/g, "&#8226;");                         // bullets
      }      
    res.json({ summary: formatAsHTML(text)
         });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to analyze report." });
  }
});

module.exports = router;
