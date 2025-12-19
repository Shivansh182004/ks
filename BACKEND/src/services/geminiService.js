const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askGemini(message) {
  try {
    // ✅ Official supported model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Gemini SDK ERROR:", error.message);
    throw error;
  }
}

module.exports = askGemini;
