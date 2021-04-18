var API_KEY = "b09197d74428f8d485f51ba02ad2e29c";
var figureEl = document.getElementById("#current-weather");
// console.log(figureEl)
var searchEl = document.getElementById("search-button");
var clearEl = document.getElementById("clear-button");
var listEl = document.getElementById("list");
var dateDisplay
var timestamp = document.querySelector("#take2");






function getWeatherData(city = "jerusalem") {
    timestamp.textContent = new Date().toLocaleDateString()
    var cityName;
    var cityTypedFromUser = document.querySelector("#search-value").value;

    if (cityTypedFromUser.length === 0) {
        cityName = city;
    } else {
        cityName = cityTypedFromUser;
    }

    var savedWeatherSearches =
        JSON.parse(localStorage.getItem("savedWeather")) || [];
    if (!savedWeatherSearches.includes(cityName)) {
        savedWeatherSearches.push(cityName);
        localStorage.setItem("savedWeather", JSON.stringify(savedWeatherSearches));
        createList(savedWeatherSearches);
    }

    fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            cityName +
            "&appid=" +
            API_KEY +
            "&units=metric"
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

            var humidity = document.createElement("div");
            humidity.textContent = "Humidity:" + data.main.humidity;
            currentWeatherCard.appendChild(humidity);

            var temperature = document.createElement("div");
            temperature.textContent = "Temp: " + data.main.temp;
            currentWeatherCard.appendChild(temperature);

            var wind = document.createElement("div");
            wind.textContent = "WindSpeed:" + data.wind.speed;
            currentWeatherCard.appendChild(wind);

            var uv = document.createElement("div");
            uv.setAttribute("class", "uv");
            currentWeatherCard.appendChild(uv);

            //create element for store the humidity in
            //assign the testcontent opf the above element whatever the humidity
            //append the element to the currentWeatherCard

            document
                .querySelector(".currentWeatherCard")
                .appendChild(currentWeatherCard);

            var latitude = data.coord.lat;
            console.log(latitude);
            var longitude = data.coord.lon;
            console.log(longitude);
            getForecast(latitude, longitude);


        });
}

//5 day
function getForecast(latitude, longitude) {
    fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${API_KEY}`
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            document.getElementsByClassName("uv").textContent =
                "UV:" + data.current.uvi;
            document.querySelector(".forecastCards").innerHTML = ""
                // data.daily.length
            for (var i = 0; i < 5; i++) {
                console.log(i);
                // var timestamp = moment.unix(data.daily[i].dt).format('M/D/YYYY');
                var forecast1 = document.createElement("div");
                forecast1.setAttribute("class", "col-2");
                var forecast1humidity = document.createElement("div");
                forecast1humidity.textContent = "Humidity:" + data.daily[i].humidity;
                var forecasttemp = document.createElement("div");
                var celsiusTemp = temperatureConverter(data.daily[i].temp.day).slice(0, 4)
                forecasttemp.textContent = "Temp:" + celsiusTemp;
                var forecast3uv = document.createElement("div");
                forecast3uv.textContent = "UV:" + data.daily[i].uvi;
                var image = document.createElement("img");
                image.setAttribute(
                    "src",
                    `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`
                );
                // var timestamp = new Date(data.daily[i].dt);
                // timestamp.textContent =
                //     new Date(data.list[i].dt_txt).toLocaleDateString()
                // timestamp.textContent = new Date().toLocaleDateString()
                dateDisplay = document.createElement("p");
                dateDisplay.innerHTML = new Date().toLocaleDateString();
                // console.log("fivet time" + data.list[i].dt)


                forecast1.appendChild(dateDisplay);
                forecast1.appendChild(image);

                forecast1.appendChild(forecast1humidity);
                forecast1.appendChild(forecasttemp);
                forecast1.appendChild(forecast3uv);
                document.querySelector(".forecastCards").appendChild(forecast1);
            }

            //Going to be creating 5 cards - for data.daily[0] up to data.daily[4]
            //these will be being appended to the forecast div
        });
}

function temperatureConverter(valNum) {
    var celsius = parseInt(valNum) - 273.15;
    return celsius.toString();
}

function createList(listOfCities) {
    // console.log("Create called")
    // var list = document.getElementById("list");
    console.log(list)
    list.innerHTML = "";
    for (var i = 0; i < listOfCities.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = listOfCities[i];
        listItem.addEventListener("click", getWeatherData(listItem[i]))

        list.appendChild(listItem);

    }
}

function clearWeather() {
    localStorage.clear();
    window.location.reload();
}

document
    .querySelector(".search-button")
    .addEventListener("click", getWeatherData);

var savedWeatherSearches =
    JSON.parse(localStorage.getItem("savedWeather")) || [];
if (savedWeatherSearches.length > 0) {
    createList(savedWeatherSearches);
    getWeatherData(savedWeatherSearches[savedWeatherSearches.length - 1]);
} else {
    getWeatherData();
}

// function displayTime() {
//     var timestamp = moment.unix(data.daily[i].dt).format('M/D/YYYY');

//     timeDisplayEl.text(timestamp);
//     colorTime();
// }
// setInterval(displayTime, 1000);