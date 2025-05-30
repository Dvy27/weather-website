const apiKey = "1cd5d57de3b818c309b0dbf530a66b60";
const weatherDataEle = document.querySelector(".weather-data");
const cityNameEle = document.querySelector("#cityname");
const formEle = document.querySelector("#weather-form");
const imgIcon = document.querySelector(".icon");

formEle.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = cityNameEle.value.trim();
  if (cityValue) {
    getWeatherData(cityValue);
  }
});

async function getWeatherData(city) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels Like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed: ${data.wind.speed} m/s`
    ];

    weatherDataEle.style.display = "block";
    weatherDataEle.querySelector(".temp").textContent = `${temperature}°C`;
    weatherDataEle.querySelector(".desc").textContent = description;
    imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">`;
    weatherDataEle.querySelector(".details").innerHTML = details.map(d => `<div>${d}</div>`).join("");

    updateBackground(icon);
  } catch (err) {
    alert("City not found. Please try again.");
    weatherDataEle.style.display = "none";
  }
}

function updateBackground(iconCode) {
  const body = document.body;
  body.className = ""; // Reset all classes

  const condition = iconCode.slice(0, 2);
  const isDay = iconCode.includes("d");
  let weatherClass = "";
  let themeClass = "";

  switch (condition) {
    case "01": weatherClass = isDay ? "clear-day" : "clear-night"; break;
    case "02":
    case "03":
    case "04": weatherClass = isDay ? "cloudy-day" : "cloudy-night"; break;
    case "09":
    case "10": weatherClass = isDay ? "rainy-day" : "rainy-night"; break;
    case "11": weatherClass = "storm"; break;
    case "13": weatherClass = "snow"; break;
    case "50": weatherClass = "mist"; break;
    default:   weatherClass = "default";
  }

  // Set theme based on brightness
  themeClass = (isDay && ["01", "02", "03", "04", "13", "50"].includes(condition)) ? "light-theme" : "dark-theme";

  body.classList.add(weatherClass, themeClass);
}
