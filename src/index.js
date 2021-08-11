function formatDate() {
  let now = new Date();
  let minutes = now.getMinutes();
  let hours = now.getHours();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
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
  let number = now.getDate();

  let date = `${day}, ${month} ${number}, ${hours}:${minutes} `;

  let dateHeading = document.querySelector(".date-time");
  {
    dateHeading.innerHTML = date;
  }
}

formatDate();

//Show Temperature, Searched City

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempHeading = document.querySelector("h1");
  tempHeading.innerHTML = `${temperature}°C`;

  let highTemp = document.querySelector("#high");
  highTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;

  let lowTemp = document.querySelector("#low");
  lowTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°`;

  let feelsLikeTemp = document.querySelector("#feels-like-temp");
  feelsLikeTemp.innerHTML = `FEELS LIKE ${Math.round(
    response.data.main.feels_like
  )}°`;

  let briefWeatherDesc = document.querySelector("h3");
  briefWeatherDesc.innerHTML = `${response.data.weather[0].description}`;

  let humidityInfo = document.querySelector("#humidity");
  humidityInfo.innerHTML = `${response.data.main.humidity}%`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}`;
}

function searchBar(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let citySearched = document.querySelector("h2");
  citySearched.innerHTML = searchInput.value;
  console.log(searchInput.value);

  let apiKey = "f3e9b7fb8cbac59f9b2f8b3d635b8d32";
  let city = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchBar);

//Bonus Add Current Location Button display city and temperature
function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f3e9b7fb8cbac59f9b2f8b3d635b8d32";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCurrent).then(showTemperature);
  console.log(position);
}

function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let button = document.querySelector("#submit-current-city-button");
button.addEventListener("click", findCurrentLocation);
