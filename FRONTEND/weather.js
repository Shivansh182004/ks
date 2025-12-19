document.addEventListener("DOMContentLoaded", () => {

  const locationSelect = document.getElementById("locationSelect");

  const weatherTitle = document.getElementById("weatherTitle");
  const weatherDesc = document.getElementById("weatherDesc");

  const temp = document.getElementById("temp");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");
  const rain = document.getElementById("rain");

  const cropImpact = document.getElementById("cropImpact");
  const dosDonts = document.getElementById("dosDonts");

  const day1 = document.getElementById("day1");
  const day2 = document.getElementById("day2");
  const day3 = document.getElementById("day3");

  const weatherAlert = document.getElementById("weatherAlert");

  // Safety check
  if (!locationSelect) {
    console.error("locationSelect not found in weather.html");
    return;
  }

  // Weather data (sample – can be replaced with API later)
  const weatherData = {
    up: {
      title: "Sunny & Dry",
      desc: "Clear sky with moderate temperature throughout the day.",
      temp: "28°C",
      humidity: "45%",
      wind: "10 km/h",
      rain: "5%",
      impact: "Good conditions for harvesting and fertilizer application.",
      advisory: [
        "Irrigate crops early morning or evening",
        "Avoid pesticide spraying at noon",
        "Harvesting conditions are favorable"
      ],
      forecast: ["30°C ☀️", "29°C ☀️", "28°C 🌤️"],
      alert: "No severe weather alert"
    },

    bihar: {
      title: "Humid & Cloudy",
      desc: "High humidity with chances of light rainfall.",
      temp: "27°C",
      humidity: "70%",
      wind: "8 km/h",
      rain: "40%",
      impact: "Higher risk of fungal disease in crops.",
      advisory: [
        "Avoid over-irrigation",
        "Ensure proper field drainage",
        "Monitor crops for fungal infection"
      ],
      forecast: ["28°C 🌥️", "27°C 🌦️", "26°C 🌧️"],
      alert: "Light rainfall expected"
    },

    mp: {
      title: "Hot & Dry",
      desc: "Strong sunlight and low humidity conditions.",
      temp: "31°C",
      humidity: "35%",
      wind: "12 km/h",
      rain: "2%",
      impact: "Moisture stress possible in crops.",
      advisory: [
        "Increase irrigation frequency",
        "Use mulching to retain soil moisture",
        "Avoid spraying during daytime"
      ],
      forecast: ["32°C ☀️", "31°C ☀️", "30°C 🌤️"],
      alert: "Heat stress warning"
    }
  };

  // Handle location change
  locationSelect.addEventListener("change", () => {
    const key = locationSelect.value;

    if (!weatherData[key]) {
      resetUI();
      return;
    }

    const data = weatherData[key];

    weatherTitle.textContent = data.title;
    weatherDesc.textContent = data.desc;

    temp.textContent = data.temp;
    humidity.textContent = data.humidity;
    wind.textContent = data.wind;
    rain.textContent = data.rain;

    cropImpact.textContent = data.impact;

    dosDonts.innerHTML = "";
    data.advisory.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      dosDonts.appendChild(li);
    });

    day1.textContent = data.forecast[0];
    day2.textContent = data.forecast[1];
    day3.textContent = data.forecast[2];

    weatherAlert.textContent = data.alert;
  });

  // Reset UI if no location selected
  function resetUI() {
    weatherTitle.textContent = "Select a location";
    weatherDesc.textContent = "Detailed weather information will appear here.";

    temp.textContent = "—";
    humidity.textContent = "—";
    wind.textContent = "—";
    rain.textContent = "—";

    cropImpact.textContent = "—";
    dosDonts.innerHTML = "<li>Select a location to view advisory.</li>";

    day1.textContent = "—";
    day2.textContent = "—";
    day3.textContent = "—";

    weatherAlert.textContent = "—";
  }

});
