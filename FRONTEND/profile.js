const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const inputs = document.querySelectorAll("#profileForm input");

const cardName = document.getElementById("cardName");
const cardLocation = document.getElementById("cardLocation");

let editing = false;

editBtn.addEventListener("click", () => {
  editing = !editing;

  inputs.forEach(i => i.disabled = !editing);
  saveBtn.classList.toggle("hidden");

  editBtn.innerHTML = editing
    ? '<i class="fa-solid fa-xmark"></i> Cancel'
    : '<i class="fa-solid fa-pen"></i> Edit';
});

saveBtn.addEventListener("click", () => {
  inputs.forEach(i => i.disabled = true);
  saveBtn.classList.add("hidden");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Edit';

  cardName.textContent = document.getElementById("name").value;
  cardLocation.textContent = document.getElementById("address").value;

  alert("Profile updated successfully!");
});


// ================= LEARNING GRAPH =================

document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("learningChart");
  if (!canvas) {
    console.error("Canvas not found");
    return;
  }

  const ctx = canvas.getContext("2d");

  const learningData = {
    week: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [1, 0, 2, 1, 3, 1, 2]
    },
    month: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [4, 6, 5, 7]
    },
    year: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
               "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      data: [5, 6, 8, 10, 9, 12, 14, 15, 16, 18, 20, 22]
    }
  };

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: learningData.week.labels,
      datasets: [{
        data: learningData.week.data,
        borderColor: "#2e7d32",
        backgroundColor: "rgba(46,125,50,0.2)",
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  document.querySelectorAll(".graph-tabs .tab").forEach(tab => {
    tab.addEventListener("click", () => {

      document.querySelectorAll(".tab")
        .forEach(t => t.classList.remove("active"));

      tab.classList.add("active");

      const type = tab.dataset.type;
      chart.data.labels = learningData[type].labels;
      chart.data.datasets[0].data = learningData[type].data;
      chart.update();
    });
  });

});

// TAB SWITCHING
document.querySelectorAll(".graph-tabs .tab").forEach(tab => {
  tab.addEventListener("click", () => {

    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const type = tab.dataset.type;

    chart.data.labels = learningData[type].labels;
    chart.data.datasets[0].data = learningData[type].data;
    chart.update();
  });
});
