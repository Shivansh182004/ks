const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");

/* ================= ADD MESSAGE ================= */

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = type === "user" ? "user-msg" : "bot-msg";
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/* ================= TYPING INDICATOR ================= */

function showTyping() {
  const typingDiv = document.createElement("div");
  typingDiv.className = "bot-msg typing";
  typingDiv.id = "typingIndicator";
  typingDiv.textContent = "AI is thinking...";
  chatWindow.appendChild(typingDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typingIndicator");
  if (typing) typing.remove();
}

/* ================= SEND MESSAGE ================= */

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  showTyping();

  setTimeout(() => {
    removeTyping();
    const reply = getBotReply(text);
    addMessage(reply, "bot");
  }, 800);
}

/* ================= QUICK QUESTIONS ================= */

function sendQuick(text) {
  userInput.value = text;
  sendMessage();
}

/* ================= ENTER KEY SUPPORT ================= */

userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

/* ================= SMART AI LOGIC ================= */

function getBotReply(input) {
  input = input.toLowerCase();

  /* ---- Crop Detection ---- */
  const isWheat = input.includes("wheat");
  const isRice = input.includes("rice");
  const isMaize = input.includes("maize");
  const isMustard = input.includes("mustard");

  /* ---- Intent Detection ---- */
  const isDisease = input.includes("disease") || input.includes("fungus") || input.includes("infection");
  const isPest = input.includes("pest") || input.includes("insect");
  const isFertilizer = input.includes("fertilizer") || input.includes("urea") || input.includes("dap");
  const isSoil = input.includes("soil");
  const isWeather = input.includes("weather") || input.includes("rain") || input.includes("temperature");

  /* ---- Responses ---- */

  if (isWheat && isFertilizer) {
    return "🌾 For wheat, apply Nitrogen in split doses. Use NPK during sowing and urea at tillering stage.";
  }

  if (isRice && isDisease) {
    return "🍚 Rice diseases increase with high humidity. Ensure field drainage and monitor leaf discoloration.";
  }

  if (isMaize && isPest) {
    return "🌽 Maize is prone to fall armyworm. Inspect whorls regularly and use recommended bio-pesticides.";
  }

  if (isMustard) {
    return "🌼 Mustard grows best in cool climate. Avoid excess irrigation and watch for aphid attacks.";
  }

  if (isSoil) {
    return "🌱 Improve soil health by adding organic manure, rotating crops, and conducting soil tests regularly.";
  }

  if (isWeather) {
    return "🌦️ Weather impacts irrigation and disease risk. Avoid spraying before rainfall and during strong winds.";
  }

  if (isFertilizer) {
    return "🧪 Fertilizer use should be based on soil testing. Avoid overuse of nitrogen to prevent crop damage.";
  }

  if (isDisease || isPest) {
    return "🐛 Disease and pest control depends on crop stage. Prefer bio-pesticides and follow IPM practices.";
  }

  /* ---- Default Fallback ---- */
  return "🤖 I can help with crops, diseases, fertilizers, soil health, and weather impact. Please ask clearly 🌱";
}
