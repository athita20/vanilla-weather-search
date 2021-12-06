function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}, `;
}

function displayWeather(response) {
  let city = document.querySelector("#city");
  let description = document.querySelector("#description");
  let temp = document.querySelector("#temp");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#weather-icon");
  city.innerHTML = `${response.data.name}`;
  description.innerHTML = `${response.data.weather[0].description}`;
  temp.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = `${response.data.main.humidity}`;
  wind.innerHTML = `${response.data.wind.speed}`;
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(cityInput) {
  let apiKey = "31d9e4a87fd2740761d20aeaee4d9ab6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-input").value;
  searchCity(cityInput);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

searchCity("Bangkok");
