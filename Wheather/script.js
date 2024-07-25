document.addEventListener('DOMContentLoaded', function() {
    const submit = document.getElementById('images');

    submit.addEventListener('click', () => {
        const city = document.getElementById('text').value;
        const result = document.getElementById('result');
        const weatherImages = document.getElementById('weatherImage');
        const temp = document.getElementById('temp');
        const humidity = document.getElementById('humidity');
        const sealevel = document.getElementById('sealevel');
        const speed = document.getElementById('windSpeed');
        const details = document.getElementById('details');

        if (city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=36395fb8b0138a124a18337684146731`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('City not found');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    const weather = data.weather[0].main;
                    let imageUrl = '';

                    switch (weather) {
                        case "Clouds":
                            imageUrl = "weather/cloud.png";
                            break;
                        case "Clear":
                            imageUrl = "weather/clear.png";
                            break;
                        case "Mist":
                            imageUrl = "weather/mist.png";
                            break;
                        case "Rain":
                            imageUrl = "weather/rain.png";
                            break;
                        case "Snow":
                            imageUrl = "weather/snow.png";
                            break;
                        default:
                            imageUrl = "weather/clear.png"; // 
                            break;
                    }

                    const temperature = Math.round(data.main.temp - 273.15);
                    temp.innerHTML = `<p>${temperature}<sup style="font-size:20px">°C</sup></p>`;
                    weatherImages.innerHTML = `<img src="${imageUrl}" alt="${weather.toLowerCase()}">`;

                    const description = data.weather[0].description;
                    const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);
                    result.innerHTML = `<p style="font-weight:800; font-size: 20px; color: black; font-style: italic;">${capitalizedDescription}</p>`;
                    humidity.innerHTML = `<p>${data.main.humidity}<br>Humidity</p>`;
                    sealevel.innerHTML = `<p>${data.main.sea_level}<br>Sea level</p>`;
                    speed.innerHTML = `<p>${Math.round(data.wind.speed)}<br>Speed</p>`;
                    
                    details.style.cssText = "background-color: rgb(234, 233, 233); color: black; width: 330px; margin-top: 40px; display:flex; flex-direction:row; justify-content: center; align-items:center; border: 1px solid grey; border-radius: 10px";
                })
                .catch(error => {
                    alert('City is not found, please try again'); 
                });
        } else {
            result.innerHTML = `<p>Please enter a city name.</p>`;
        }
    });
});
