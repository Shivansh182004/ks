
// ================= AUTH GUARD =================
(function protectDashboard() {
  const token = localStorage.getItem("krishiToken");

  // Only protect HOME page
  if (!token && window.location.pathname.includes("home.html")) {
    alert("Please login first");
    window.location.href = "index.html";
  }
})();

/* ================= AI CHATBOT WORKING LOGIC ================= */

document.addEventListener("DOMContentLoaded", () => {

  const chatWindow = document.getElementById("chatWindow");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");

  // Run chatbot code ONLY if chatbot elements exist
  if (chatWindow && chatInput && chatSend) {

    function addMessage(text, sender = "bot") {
      const div = document.createElement("div");
      div.className = sender === "user" ? "msg user" : "msg bot";
      div.innerText = text;
      chatWindow.appendChild(div);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    async function askAI(question) {
      addMessage(question, "user");

      try {
        const res = await fetch("http://127.0.0.1:5000/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: question })
        });

        const data = await res.json();
        addMessage(data.reply || "No AI response", "bot");

      } catch {
        addMessage("❌ Backend not responding", "bot");
      }
    }

    chatSend.addEventListener("click", () => {
      if (!chatInput.value.trim()) return;
      askAI(chatInput.value.trim());
      chatInput.value = "";
    });

    chatInput.addEventListener("keydown", e => {
      if (e.key === "Enter") chatSend.click();
    });
  }
});


/* ================= AUTH (REGISTER + LOGIN) ================= */

const API_URL = "http://127.0.0.1:5000/api/farmers";


/* -------- REGISTER -------- */
async function registerFarmer() {
  const name = document.getElementById("regName")?.value.trim();
  const email = document.getElementById("regEmail")?.value.trim();
  const password = document.getElementById("regPassword")?.value.trim();

  if (!name || !email || !password) {
    alert("Please fill all required fields");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    alert("✅ Registration successful! Now click Login.");

  } catch {
    alert("❌ Backend server not responding");
  }
}

/* -------- LOGIN (USING SAME EMAIL & PASSWORD FIELDS) -------- */
async function loginFarmer() {
  const email = document.getElementById("regEmail")?.value.trim();
  const password = document.getElementById("regPassword")?.value.trim();

  if (!email || !password) {
    alert("Enter email and password to login");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // SAVE AUTH DATA
    localStorage.setItem("krishiToken", data.token);
    localStorage.setItem("farmerData", JSON.stringify(data.farmer));

    // REDIRECT TO DASHBOARD
    window.location.href = "home.html";

  } catch {
    alert("❌ Backend server not responding");
  }
}

/* -------- LOGOUT -------- */
function logoutFarmer() {
  localStorage.removeItem("krishiToken");
  localStorage.removeItem("farmerData");

  alert("Logged out successfully");
  window.location.href = "index.html";
}
