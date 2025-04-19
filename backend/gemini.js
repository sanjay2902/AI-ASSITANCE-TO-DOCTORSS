// gemini.js
const axios = require("axios");

async function analyzeImageWithGemini(base64Image) {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: "Analyze this medical report and summarize the findings.",
              },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: base64Image,
                },
              },
            ],
          },
        ],
      },
      {
        params: {
          key: process.env.GEMINI_API_KEY,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data.candidates[0].content.parts[0].text;
    return summary;
  } catch (err) {
    console.error("Gemini Error:", err.response?.data || err.message);
    throw new Error("Failed to analyze image");
  }
}

module.exports = { analyzeImageWithGemini };
