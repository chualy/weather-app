function formatDate(timestamp) {
  let now = new Date(timestamp);

  let dayOfMonth = now.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[now.getMonth()];

  let year = now.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${dayOfMonth} ${month} ${year}, ${day} <br> ${hours}:${minutes}`;
}

function showSearchCityResult(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let cityTemp = document.querySelector("#temp-number");
  cityTemp.innerHTML = Math.round(response.data.main.temp);

  let feelsLikeTemp = document.querySelector("#feelslike-temp-number");
  feelsLikeTemp.innerHTML = Math.round(response.data.main.feels_like);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  let windSpeed = response.data.wind.speed;
  windElement.innerHTML = Math.round((`${windSpeed}` * 60 * 60) / 1000);

  let daytimeElement = document.querySelector("#day-time");
  daytimeElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `src/image/weather-icon-custom/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].description`);

  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "166b9c0e1c83778d358b7f11ac37349b";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unit}&appid=${apiKey}`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function search(city) {
  let apiKey = "166b9c0e1c83778d358b7f11ac37349b";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(showSearchCityResult);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
}

function changeCurrentLocation(action) {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

function getCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "166b9c0e1c83778d358b7f11ac37349b";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

  console.log(apiUrl);

  axios.get(apiUrl).then(showSearchCityResult);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-number");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-number");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row d-flex justify-content-center">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col=2">
        <div class="forecast-indiv">
          <h5 class="forecast-day">${formatDay(forecastDay.dt)}</h5>
          <img
            src="src/image/weather-icon-custom/${
              forecastDay.weather[0].icon
            }.png"
            alt="${forecastDay.weather[0].description}"
            width="80px"
          />
          <h5 class="forecast-temp">
            <span class="forecast-temp-max">${Math.round(
              forecastDay.temp.max
            )}°</span> <br />
            <span class="forecast-temp-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </h5>
        </div>
      </div> 
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", changeCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let celsiusTemp = null;

search("Singapore");
