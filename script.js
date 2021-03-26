var API_KEY = 'b09197d74428f8d485f51ba02ad2e29c';

function weatherData (cityName) {
    fetch('api.openweathermap.org/data/2.5/weather?q=' + cityName +'&appid=' + API_KEY)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var currentWeather = data.weather[0].main
        displayWeather(currentWeather)
    });
}

getWeatherData('Jerusalem')

function returnIconURL (code) {
    return ' http://openweathermap.org/img/wn' + code + '.png'
}



