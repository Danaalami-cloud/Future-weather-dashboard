var API_KEY = "b09197d74428f8d485f51ba02ad2e29c";
var figureEl = document.getElementById("#current-weather");
// console.log(figureEl)
var searchEl = document.getElementById("search-button");
var clearEl = document.getElementById("clear-button");

function getWeatherData() {
  var cityName = document.querySelector("#search-value").value;

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      API_KEY
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      document.querySelector(".currentWeatherCard").innerHTML = "";
      var currentWeatherCard = document.createElement("div");

      var citySearchedh3 = document.createElement("h2");
      citySearchedh3.textContent = data.name;
      currentWeatherCard.appendChild(citySearchedh3);

      var image = document.createElement("img");
      image.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
      currentWeatherCard.appendChild(image);

      var humidity = document.createElement("feels-like");
      humidity.textContent = humidity.main;
      currentWeatherCard.appendChild(humidity);

      var temperature = document.createElement("sweating")
      temperature.textContent = data.name;
      currentWeatherCard.appendChild(temperature);

        //create element for store the humidity in
        //assign the testcontent opf the above element whatever the humidity
        //append the element to the currentWeatherCard


      document
        .querySelector(".currentWeatherCard")
        .appendChild(currentWeatherCard);

      var latitude = data.coord.lat;
      console.log(latitude)
      var longitude = data.coord.lon;
      console.log(longitude)
      getForecast(latitude, longitude);
    });
}


//5 day forecast
function getForecast(latitude, longitude) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${API_KEY}`
  )
    .then((response) => {
       
      return response.json();
    })
    .then((data) => {
      console.log(data);

      //Going to be creating 5 cards - for data.daily[0] up to data.daily[4]   
      //these will be being appended to the forecast div  
    });
}

//  getWeatherData('Jerusalem')
document
  .querySelector(".search-button")
  .addEventListener("click", getWeatherData);
