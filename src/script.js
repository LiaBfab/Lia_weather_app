function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  document.querySelector(`#city-name`).innerHTML = response.data.name;
  document.querySelector(`#country`).innerHTML = response.data.sys.country;
  document.querySelector(`#temp-no`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(`#describe`).innerHTML =
    response.data.weather[0].description;
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
  let tempFigure = document.querySelector("#temp-no");
  tempFigure.innerHTML = 69;
}

function cLink(event) {
  event.preventDefault();
  let tempFigure = document.querySelector("#temp-no");
  tempFigure.innerHTML = 19;
}

let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

showCity("New York");
