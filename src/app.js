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
}

let apiKey = "166b9c0e1c83778d358b7f11ac37349b";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Singapore&units=${unit}&appid=${apiKey}`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemp);
