const apiKey = "1cd5d57de3b818c309b0dbf530a66b60";
const weatherDataEle = document.querySelector(".weather-data");
const cityNameEle = document.querySelector("#cityname");
const formEle = document.querySelector("form");
const imgIcon = document.querySelector(".icon");

formEle.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityNameEle.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("Network Response is not ok!");
        }

        const data = await response.json();

        const temperature = Math.floor(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`,
        ];

        weatherDataEle.querySelector(".temp").textContent = `${temperature}°C`;
        weatherDataEle.querySelector(".desc").textContent = description;

        // Add icon image dynamically
        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">`;

        // Insert weather details into .details div
        const detailsEle = weatherDataEle.querySelector(".details");
        detailsEle.innerHTML = details.map(detail => `<div>${detail}</div>`).join("");

    } catch (err) {
        console.error("Error fetching weather data:", err);
    }
}
