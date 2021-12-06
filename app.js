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
  city.innerHTML = `${response.data.name}`;
  description.innerHTML = `${response.data.weather[0].description}`;
  temp.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = `${response.data.main.humidity}`;
  wind.innerHTML = `${response.data.wind.speed}`;
  date.innerHTML = formatDate(response.data.dt * 1000);
}

let cityInput = "Bangkok";

let apiKey = "31d9e4a87fd2740761d20aeaee4d9ab6";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);
