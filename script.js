const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  if (!city) return;

  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

  if (!response.ok) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }

  const data = await response.json();

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML =
    data.main.humidity + "%";
  document.querySelector(".wind").innerHTML =
    data.wind.speed + " km/h";

  const condition = data.weather[0].main;

  if (condition === "Clouds") weatherIcon.src = "img/clouds.png";
  else if (condition === "Clear") weatherIcon.src = "img/clear.png";
  else if (condition === "Rain") weatherIcon.src = "img/rain.png";
  else if (condition === "Drizzle") weatherIcon.src = "img/drizzle.png";
  else if (condition === "Mist") weatherIcon.src = "img/mist.png";

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
