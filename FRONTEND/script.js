// Helper: show section
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".section");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const target = item.getAttribute("data-section");
    navItems.forEach((n) => n.classList.remove("active"));
    item.classList.add("active");
    sections.forEach((sec) => {
      sec.classList.toggle("visible", sec.id === target);
    });
  });
});

// Registration logic (store basic info in localStorage)
const registrationOverlay = document.getElementById("registrationOverlay");
const registrationForm = document.getElementById("registrationForm");
const registrationMessage = document.getElementById("registrationMessage");
const farmerNameEl = document.getElementById("farmerName");
const farmerLocationEl = document.getElementById("farmerLocation");
const logoutBtn = document.getElementById("logoutBtn");
const mainCropNameEl = document.getElementById("mainCropName");

function loadFarmerProfile() {
  const data = JSON.parse(localStorage.getItem("krishiSakhiFarmer") || "null");
  if (data) {
    farmerNameEl.textContent = data.name || "Farmer";
    farmerLocationEl.textContent =
      (data.district ? data.district + ", " : "") + (data.state || "");
    mainCropNameEl.textContent = data.crops || "Your crop";
    registrationOverlay.classList.remove("active");
  } else {
    registrationOverlay.classList.add("active");
  }
}

// Run on start
loadFarmerProfile();

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const state = document.getElementById("state").value;
  const district = document.getElementById("district").value.trim();
  const landSize = document.getElementById("landSize").value.trim();
  const crops = document.getElementById("crops").value.trim();
  const password = document.getElementById("password").value.trim();
  const whatsappOptIn = document.getElementById("whatsappOptIn").checked;

  if (mobile.length < 10) {
    registrationMessage.textContent =
      "Please enter a valid 10-digit mobile number.";
    return;
  }

  const data = {
    name,
    mobile,
    state,
    district,
    landSize,
    crops,
    password,
    whatsappOptIn,
  };

  localStorage.setItem("krishiSakhiFarmer", JSON.stringify(data));
  registrationMessage.textContent =
    "Registration successful. Opening dashboard...";

  // redirect to home page
  setTimeout(() => {
    window.location.href = "home.html";
  }, 800);
}); // <‑‑ this ); closes addEventListener



logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("krishiSakhiFarmer");
  registrationOverlay.classList.add("active");
});

// Quick navigation chips
document.querySelectorAll("[data-section-target]").forEach((chip) => {
  chip.addEventListener("click", () => {
    const target = chip.getAttribute("data-section-target");
    document
      .querySelector(`.nav-item[data-section="${target}"]`)
      .click();
  });
});

// Simple chatbot mock (frontend only)
const chatWindow = document.getElementById("chatWindow");
const chatInput = document.getElementById("chatInput");
const chatSendBtn = document.getElementById("chatSendBtn");

function addMessage(text, sender = "user") {
  const msg = document.createElement("div");
  msg.className = `chat-message ${sender}`;
  msg.innerHTML = `<p>${text}</p><span class="time">${
    sender === "user" ? "You" : "AI Assistant"
  }</span>`;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function fakeAiReply(userText) {
    let reply =
        "Thank you for your question. Detailed AI answers will come once backend is connected.";
    
    // Convert user text to lowercase (currently unused, but good practice)
    const lower = userText.toLowerCase(); 

    // **THIS IS THE MISSING PART**
    return reply;
}

// Example of calling the function:
// let aiResponse = fakeAiReply("Hello!");
// console.log(aiResponse); // Output: "Thank you for your question. Detailed AI answers will come once backend is connected."