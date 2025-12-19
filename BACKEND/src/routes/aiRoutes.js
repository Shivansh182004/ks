const express = require("express");
const router = express.Router();
const askGemini = require("../services/geminiService");

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    console.log("🟡 Incoming AI request:", message);

    if (!message) {
      return res.json({ reply: "Please ask a question." });
    }

    const reply = await askGemini(message);
    return res.json({ reply });

  } catch (error) {
    console.error("🔴 AI Error:", error.message);
    return res.json({ reply: "AI service error. Try again." });
  }
});

module.exports = router;
