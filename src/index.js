let now = new Date();

let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let currentDay = days[now.getDay()];
console.log(currentDay);
let currentHours = now.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}

let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let currentDate = document.querySelector(".date");
currentDate.innerHTML = `${currentDay} ${currentHours}:${currentMinute}`;

function returnCityName(event) {
  event.preventDefault();
  let enteredCity = document.querySelector("#search-city");

  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = enteredCity.value;

  let apiKey = "701f06352d61835bc4fc894e7b084629";
  let city = enteredCity.value;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  function showTemp(response) {
    let temp = Math.round(response.data.main.temp);
    let value = document.querySelector(".temperature-value");
    value.innerHTML = temp;
    let humidity = response.data.main.humidity;
    let humidValue = document.querySelector(".Humidity");
    humidValue.innerHTML = `${humidity}%`;
    let wind = Math.round(response.data.wind.speed);
    let windValue = document.querySelector(".Wind");
    windValue.innerHTML = `${wind}mph`;
    console.log(response.data);
    let descripWeather = response.data.weather[0].description;
    let weatherCondition = document.querySelector(".Condition");
    weatherCondition.innerHTML = descripWeather;
  }

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
let searchCity = document.querySelector("#enter-city-name-form");
searchCity.addEventListener("submit", returnCityName);

function celciusValue() {
  event.preventDefault();
  let celciusDegree = document.querySelector(".temperature-value");
  celciusDegree.innerHTML = 32;
}
let clickCelcius = document.querySelector("#celcius-link");
clickCelcius.addEventListener("click", celciusValue);

function fahrenValue() {
  event.preventDefault();
  let fahrenDegree = document.querySelector(".temperature-value");
  fahrenDegree.innerHTML = 97;
}
let clickFahren = document.querySelector("#fahrenheit-link");
clickFahren.addEventListener("click", fahrenValue);

function showCurrentLocation(position) {
  let apiKey = "701f06352d61835bc4fc894e7b084629";
  let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${locationUrl}&appid=${apiKey}`).then(function (response) {
    let temp = Math.round(response.data.main.temp);
    let humidity = response.data.main.humidity;
    let windSpeed = Math.round(response.data.wind.speed);
    let showCurrentTemp = document.querySelector(".temperature-value");
    showCurrentTemp.innerHTML = temp;
    let showCurrentHumidity = document.querySelector(".Humidity");
    showCurrentHumidity.innerHTML = `${humidity} %`;
    let showCurrentWind = document.querySelector(".Wind");
    showCurrentWind.innerHTML = `${windSpeed} mph`;
    let weatherCondition = response.data.weather[0].description;
    let showCurrentWeather = document.querySelector(".Condition");
    showCurrentWeather.innerHTML = weatherCondition;

    let cityName = response.data.name;
    let currentCity = document.querySelector(".city-name");
    currentCity.innerHTML = cityName;
  });
}

function showNavi(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentButton = document.querySelector(".current-location");
currentButton.addEventListener("click", showNavi);
