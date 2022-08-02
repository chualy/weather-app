function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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

  return `${day} ${hours}:${minutes}`;
}

function showSearchCityResult(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let cityTemp = document.querySelector("#temp-number");
  cityTemp.innerHTML = Math.round(response.data.main.temp);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  let windSpeed = response.data.wind.speed;
  windElement.innerHTML = ((`${windSpeed}` * 60 * 60) / 1000).toFixed(1);

  let daytimeElement = document.querySelector("#day-time");
  daytimeElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].description`);

  celsiusTemp = response.data.main.temp;
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thurs", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col=2">
        <div class="forecast-indiv">
          <h5 class="forecast-day">${day}</h5>
          <img
            src="https://openweathermap.org/img/wn/02d@2x.png"
            alt="clouds"
            width="70%"
          />
          <h5 class="forecast-temp">
            <span class="forecast-temp-max">30°</span> <br />
            <span class="forecast-temp-min">22°</span>
          </h5>
        </div>
      </div> 
    `;
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let celsiusTemp = null;

search("Singapore");
displayForecast();
