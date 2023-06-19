function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDay];

  return `${day} ${hours}:${minutes}`;
}

function showWeather(response) {
  let cityName = document.querySelector(`#city-name`);
  let country = document.querySelector(`#country`);
  let humidity = document.querySelector(`#humidity`);
  let wind = document.querySelector(`#wind`);
  let description = document.querySelector(`#description`);
  let temperature = document.querySelector(`#temp-no`);
  let currentDate = document.querySelector("#current-date");
  let mainIcon = document.querySelector(`#main-icon`);

  cityName.innerHTML = response.data.name;
  country.innerHTML = response.data.sys.country;
  cTemperature = response.data.main.temp;
  temperature.innerHTML = Math.round(cTemperature);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  mainIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainIcon.setAttribute("alt", response.data.weather[0].description);
}

function showCity(city) {
  let units = `metric`;
  let apiKey = `c430527bddbb569e890e855c8b2b9a1c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine").value;
  showCity(city);
}

function showPosition(position) {
  let apiKey = `c430527bddbb569e890e855c8b2b9a1c`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function fLink(event) {
  event.preventDefault();
  linkCelsius.classList.remove(`active`);
  linkFahreheit.classList.add(`active`);
  let fTemperature = (cTemperature * 9) / 5 + 32;
  let temperature = document.querySelector(`#temp-no`);
  temperature.innerHTML = Math.round(fTemperature);
}

function cLink(event) {
  event.preventDefault();
  linkCelsius.classList.add(`active`);
  linkFahreheit.classList.remove(`active`);
  let temperature = document.querySelector("#temp-no");
  temperature.innerHTML = Math.round(cTemperature);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

let cTemperature = null;

let linkFahreheit = document.querySelector("#link-fahrenheit");
linkFahreheit.addEventListener(`click`, fLink);

let linkCelsius = document.querySelector("#link-celsius");
linkCelsius.addEventListener(`click`, cLink);

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

showCity("New York");
