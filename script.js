
function fetchWeatherData(latitude, longitude) {
    const apiKey = '3534f601a2c63c2fe4f04f01f6e41361';
    const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const locationElement = document.getElementById('location');
            const temperatureElement = document.getElementById('temperature');
            const conditionsElement = document.getElementById('conditions');

            locationElement.textContent = `${data.location.name}, ${data.location.country}`;
            temperatureElement.textContent = `${data.current.temperature} °C`;
            conditionsElement.textContent = data.current.weather_descriptions[0];
        })
        .catch(error => console.error('Error fetching weather data:', error));
}
function getCurrentLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchWeatherData(latitude, longitude);
            },
            error => console.error('Error getting location:', error)
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}
function randomColor(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i=0; i<6; i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}


setInterval(randomColor, 300);
body.style.backgroundColor = randomColor();
getCurrentLocation();
