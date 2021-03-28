var API_KEY = 'b09197d74428f8d485f51ba02ad2e29c';
var figureEl = document.getElementById('#current-weather');
// console.log(figureEl)
var searchEl = document.getElementById('search-button');
var clearEl = document.getElementById('clear-button');

function weatherData (cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName +'&appid=' + API_KEY)
    .then(response => response.json())
    .then(data => console.log(data));
}

 

 var icons = {
    clearSky: '01d'
}

function returnIconURL (code) {
    return  'http://openweathermap.org/img/wn/' + code + '.png'
 }

 
 returnIconURL(icons.clearSky)

 function displayWeather(currentWeather){
     figureEl.innerHTML = ''
     var currentWeather = icons[currentWeather]
     var imEl = document.createElement('img')
     imgEl.setAttribute('src', returnIconURL(currentWeather));
    figureEl.appendChild(imgEl)
 }
 getWeatherData('Jerusalem')

 var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);

 //     var currentWeather = data.weather[0].main
    //     displayWeather(currentWeather)
    // });