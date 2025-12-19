const cropSelect = document.getElementById("cropSelect");
const currentPrice = document.getElementById("currentPrice");
const priceTable = document.getElementById("priceTable");

let chart;

cropSelect.addEventListener("change", () => {
    const crop = cropSelect.value;
    if (!crop) return;

    // SAMPLE DATA (backend later)
    const data = {
        wheat: [2100, 2150, 2200, 2250, 2300, 2350],
        rice: [1900, 1950, 2000, 2050, 2100, 2150],
        maize: [1700, 1750, 1800, 1820, 1850, 1900],
        potato: [1200, 1300, 1400, 1350, 1450, 1500]
    };

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const prices = data[crop];

    currentPrice.textContent = `₹${prices[prices.length - 1]} / Quintal`;

    // Table
    priceTable.innerHTML = "";
    months.forEach((m, i) => {
        priceTable.innerHTML += `
            <tr>
                <td>${m}</td>
                <td>₹${prices[i]}</td>
            </tr>
        `;
    });

    // Chart
    if (chart) chart.destroy();
    chart = new Chart(document.getElementById("priceChart"), {
        type: "line",
        data: {
            labels: months,
            datasets: [{
                label: "Price Trend",
                data: prices,
                borderWidth: 2,
                fill: false
            }]
        }
    });
});
