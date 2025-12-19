const cropSelect = document.getElementById("cropSelect");
const title = document.getElementById("advisoryTitle");
const text = document.getElementById("advisoryText");
const list = document.getElementById("advisoryList");

const advisories = {
  wheat: {
    today: "High humidity detected",
    message: "Monitor wheat fields for fungal diseases. Avoid late evening irrigation.",
    history: [
      "Apply balanced nitrogen fertilizer",
      "Ensure proper field drainage"
    ]
  },
  rice: {
    today: "Pest monitoring advised",
    message: "Check for brown planthopper activity. Maintain water level properly.",
    history: [
      "Use resistant rice varieties",
      "Avoid excessive nitrogen use"
    ]
  }
};

cropSelect.addEventListener("change", () => {
  const crop = cropSelect.value;
  if (!advisories[crop]) return;

  title.textContent = advisories[crop].today;
  text.textContent = advisories[crop].message;

  list.innerHTML = "";
  advisories[crop].history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
});
