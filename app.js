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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col">
        <div class="forecast-date">${day}</div>
        <img
          class="forecast-icon"
          src="http://openweathermap.org/img/wn/04n@2x.png"
          alt=""
        />
        <div class="forecast-temp">
          <span class="max-temp">4°</span>
          <span style="padding-left: 9px" class="min-temp">
            0°
          </span>
        </div>
      </div>  
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "31d9e4a87fd2740761d20aeaee4d9ab6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let city = document.querySelector("#city");
  let description = document.querySelector("#description");
  let temp = document.querySelector("#temp");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#weather-icon");

  cTemp = Math.round(response.data.main.temp);

  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  temp.innerHTML = cTemp;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  cTempLink.classList.add("active");
  fTempLink.classList.remove("active");

  getForecast(response.data.coord);
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

function displayFTemp(event) {
  event.preventDefault();
  let fTemp = Math.round((cTemp * 9) / 5 + 32);
  let temp = document.querySelector("#temp");
  cTempLink.classList.remove("active");
  fTempLink.classList.add("active");
  temp.innerHTML = fTemp;
}

function displayCTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  cTempLink.classList.add("active");
  fTempLink.classList.remove("active");
  temp.innerHTML = cTemp;
}

let cTemp = null;

let fTempLink = document.querySelector("#fLink");
fTempLink.addEventListener("click", displayFTemp);

let cTempLink = document.querySelector("#cLink");
cTempLink.addEventListener("click", displayCTemp);

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

searchCity("Bangkok");
