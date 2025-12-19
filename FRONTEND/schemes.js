const category = document.getElementById("schemeCategory");
const nameEl = document.getElementById("schemeName");
const descEl = document.getElementById("schemeDesc");
const benefitEl = document.getElementById("schemeBenefit");
const eligibilityEl = document.getElementById("schemeEligibility");
const applyEl = document.getElementById("schemeApply");
const docList = document.getElementById("docList");

const schemes = {
  income: {
    name: "PM-KISAN Samman Nidhi",
    desc: "Provides financial support to small and marginal farmers.",
    benefit: "₹6,000 per year (₹2,000 × 3 installments)",
    eligibility: "Small & marginal farmer families",
    apply: "Apply online at pmkisan.gov.in",
    docs: ["Aadhaar Card", "Land Record", "Bank Passbook"]
  },

  insurance: {
    name: "Pradhan Mantri Fasal Bima Yojana",
    desc: "Crop insurance scheme to protect farmers against crop loss.",
    benefit: "Low premium, high crop insurance coverage",
    eligibility: "All farmers (loanee and non-loanee)",
    apply: "Apply via banks, CSCs, or insurance companies",
    docs: ["Aadhaar Card", "Land Record", "Sowing Certificate"]
  },

  loan: {
    name: "Kisan Credit Card (KCC)",
    desc: "Provides affordable credit to farmers for cultivation needs.",
    benefit: "Low-interest short-term crop loans",
    eligibility: "All eligible farmers",
    apply: "Apply at nearby bank branches",
    docs: ["Aadhaar Card", "PAN Card", "Land Record"]
  },

  irrigation: {
    name: "PM Krishi Sinchai Yojana",
    desc: "Improves irrigation efficiency and water use in agriculture.",
    benefit: "Subsidy on drip and sprinkler irrigation systems",
    eligibility: "Farmers with cultivable land",
    apply: "Apply through State Agriculture Department",
    docs: ["Land Record", "Bank Account Details"]
  }
};

category.addEventListener("change", () => {
  const selectedValue = category.value;

  // Reset if no category selected
  if (!schemes[selectedValue]) {
    nameEl.textContent = "Select a category";
    descEl.textContent = "Scheme details will appear here.";
    benefitEl.textContent = "—";
    eligibilityEl.textContent = "—";
    applyEl.textContent = "—";
    docList.innerHTML = "<li>Select a scheme to view documents</li>";
    return;
  }

  const data = schemes[selectedValue];

  nameEl.textContent = data.name;
  descEl.textContent = data.desc;
  benefitEl.textContent = data.benefit;
  eligibilityEl.textContent = data.eligibility;
  applyEl.textContent = data.apply;

  docList.innerHTML = "";
  data.docs.forEach(doc => {
    const li = document.createElement("li");
    li.textContent = doc;
    docList.appendChild(li);
  });
});
