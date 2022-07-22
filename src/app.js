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

function displayTemp(response) {
  console.log(response.data);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let cityTemp = document.querySelector("#temp-number");
  cityTemp.innerHTML = Math.round(response.data.main.temp);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement = ((`(response.data.wind.speed)` * 60 * 60) / 1000).toFixed(1);

  let daytimeElement = document.querySelector("#day-time");
  daytimeElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].description`);
}

let apiKey = "166b9c0e1c83778d358b7f11ac37349b";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Singapore&units=${unit}&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemp);
