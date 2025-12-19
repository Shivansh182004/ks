document.addEventListener("DOMContentLoaded", () => {

  const cropSelect = document.getElementById("cropSelect");
  const stageTitle = document.getElementById("stageTitle");
  const stageList = document.getElementById("stageList");

  const ctx = document.getElementById("growthChart");

  let chart; // store chart instance

  const cropData = {
    wheat: {
      stages: [
        "Sowing: Nov – Early Dec",
        "Germination: 7–10 days",
        "Tillering: 30–45 days",
        "Flowering: 70–90 days",
        "Harvesting: March–April"
      ],
      growth: [5, 15, 30, 50, 70, 90]
    },

    rice: {
      stages: [
        "Nursery Preparation",
        "Transplanting",
        "Tillering",
        "Panicle Initiation",
        "Harvesting"
      ],
      growth: [8, 20, 40, 65, 85, 100]
    },

    maize: {
      stages: [
        "Sowing",
        "Germination",
        "Vegetative Growth",
        "Tasseling",
        "Harvesting"
      ],
      growth: [10, 25, 45, 70, 90, 100]
    }
  };

  cropSelect.addEventListener("change", () => {
    const crop = cropSelect.value;

    if (!crop) {
      stageTitle.innerText = "Select a crop";
      stageList.innerHTML = "<li>Crop stage details will appear here</li>";
      if (chart) chart.destroy();
      return;
    }

    // Update stages
    stageTitle.innerText = crop.charAt(0).toUpperCase() + crop.slice(1) + " Growth Stages";
    stageList.innerHTML = "";
    cropData[crop].stages.forEach(stage => {
      const li = document.createElement("li");
      li.textContent = stage;
      stageList.appendChild(li);
    });

    // Draw chart
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Day 5", "Day 15", "Day 30", "Day 50", "Day 70", "Day 90"],
        datasets: [{
          label: "Growth %",
          data: cropData[crop].growth,
          borderColor: "#2e7d32",
          backgroundColor: "rgba(46,125,50,0.15)",
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });

  });

});
