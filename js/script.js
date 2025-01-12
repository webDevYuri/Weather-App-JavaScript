// API key and URL for OpenWeatherMap API
const apiKey = "728df0d70e04e1a4e4dc954f2cc0f8e9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Select input and button elements for the search functionality
const searchBox = document.querySelector(".search input"); 
const searchBtn = document.querySelector(".search button"); 

// Select the weather icon element
const weatherIcon = document.querySelector(".weather-icon");

// Asynchronous function to fetch weather data for a given city
async function checkWeather(city) {
    // Make an API call with the provided city name and API key
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // If the API response indicates a city not found (status 404)
    if(response.status == 404) {
        // Display the error message
        document.querySelector(".error").style.display = "block";
        // Hide the weather information container
        document.querySelector(".weather").style.display = "none";
        // Clear the search box
        searchBox.value = '';
    } else {
        // Parse the response JSON
        var data = await response.json();

        console.log(data); // Log the data for debugging purposes

        // Update the UI with the fetched weather data
        document.querySelector(".city-name").innerHTML = data.name; // City name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c"; // Temperature
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; // Humidity
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h"; // Wind speed

        // Update the weather icon based on the main weather condition
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "img/clouds.png"; // Cloudy weather icon
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "img/clear.png"; // Clear weather icon
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "img/rain.png"; // Rainy weather icon
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "img/drizzle.png"; // Drizzle weather icon
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "img/mist.png"; // Misty weather icon
        }

        // Display the weather information container
        document.querySelector(".weather").style.display = "block";
        // Hide the error message
        document.querySelector(".error").style.display = "none";
    }
}

// Add an event listener to the search button for click events
searchBtn.addEventListener("click", () => {
    // Call the checkWeather function with the value from the search box
    checkWeather(searchBox.value);
});
