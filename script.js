const form = document.getElementById("searchForm");
const cityField = document.getElementById("cityField");
const box = document.getElementById("weatherBox");

const API_KEY = "a9b6ca2d2deab961a49fe34acdd6afc4";

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = cityField.value.trim();
    if (!city) return showError("Enter a valid city");

    try {
        const data = await fetchWeather(city);
        renderData(data);
    } catch (err) {
        showError("City not found");
    }
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error();

    return await res.json();
}

function renderData(data) {
    const { name, main, weather } = data;

    const tempC = (main.temp - 273.15).toFixed(1);
    const emoji = pickEmoji(weather[0].id);

    box.innerHTML = `
        <div class="emoji">${emoji}</div>
        <div class="city">${name}</div>
        <div class="temp">${tempC}°C</div>
        <div class="desc">${weather[0].description}</div>
        <div class="humidity">Humidity: ${main.humidity}%</div>
    `;

    box.classList.remove("hide");
    box.classList.add("show");
}

function showError(msg) {
    box.innerHTML = `<p style="color:#b30000;font-weight:600;">${msg}</p>`;
    box.classList.add("show");
}

function pickEmoji(id) {
    if (id >= 200 && id < 300) return "⛈️";
    if (id >= 300 && id < 400) return "🌦️";
    if (id >= 500 && id < 600) return "🌧️";
    if (id >= 600 && id < 700) return "❄️";
    if (id === 800) return "☀️";
    if (id > 800) return "☁️";
    return "🌍";
}
