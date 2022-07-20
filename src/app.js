function displayTemp(response) {
  console.log(response.data);
  let currentTemp = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#temp-number");
  cityTemp.innerHTML = `${currentTemp}`;
}

let apiKey = "166b9c0e1c83778d358b7f11ac37349b";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Singapore&units=${unit}&appid=${apiKey}`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemp);
