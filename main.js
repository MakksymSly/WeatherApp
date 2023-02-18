//Hello enyone who reading this, first of all thank you. And sorry if my code seems like a mess i will make it better someday;

//Any way all variables from html gets from id and i think thats a proper clean way to get them to avoid classes.

const container = document.getElementById('container');
const search = document.getElementById('search-button');
const Weatherdetails = document.getElementById('details');
const error = document.getElementById('weather-error');
const weatherMain = document.getElementById('weather-main');
const cityInput = document.getElementById('cityName');

//getting User device width for animation and heigth property after search
const UserWindowWidth = window.innerWidth;

//Functions for formating Sunset/rise from milliseconds to hours/minutes/seconds
function getSunHours(milliseconds) {
	return Math.floor((milliseconds / 1000 / 60 / 60) % 24);
}
function getSunMinutes(milliseconds) {
	return Math.floor((milliseconds / 1000 / 60) % 60);
}
function getSunSeconds(milliseconds) {
	return Math.floor((milliseconds / 1000) % 60);
}
// Getting time to good looking format like=> 00:00:00
function formatToTime(seconds, minutes, hours) {
	let result = [];
	result.push(seconds.toString().padStart(2, '0'));
	result.push(minutes.toString().padStart(2, '0'));
	result.push(hours.toString().padStart(2, '0'));
	return result.join(':');
}
search.addEventListener('click', () => {
	const city = cityInput.value.toLowerCase();
	const APIkey = '53e9a5a0ac535fbc4d00c1722a65977b';
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;
	fetch(url)
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			//This what happend when server respose is ok!
			if (json.cod === 200) {
				weatherMain.style.display = 'block';
				UserWindowWidth < 600 ? (container.style.height = '1000px') : (container.style.height = '800px');
				Weatherdetails.style.display = 'flex';
				error.style.display = 'none';
				//Setting up Sunset/rise
				const sunriseTime = formatToTime(getSunSeconds(json.sys.sunrise), getSunMinutes(json.sys.sunrise), getSunHours(json.sys.sunrise));
				const sunsetTime = formatToTime(getSunSeconds(json.sys.sunset), getSunMinutes(json.sys.sunset), getSunHours(json.sys.sunset));
				const sunrise = (document.getElementById('sunrise').innerHTML = sunriseTime);
				const sunset = (document.getElementById('sunset').innerHTML = sunsetTime);
				//Setting up everything else to their places
				const image = document.getElementById('weather-image');
				const pressure = (document.getElementById('pressure').innerHTML = json.main.pressure);
				const wind = (document.getElementById('wind').innerHTML = json.wind.speed);
				const humidity = (document.getElementById('humidity').innerHTML = json.main.humidity);
				const temperature = (document.getElementById('temperature').innerHTML = Math.round(json.main.temp) + '&#8451;');
				const visibility = (document.getElementById('visibility').innerHTML = json.visibility);

				const description = (document.getElementById('weather-description').innerHTML = json.weather[0].description);

				// switch statement used because of poor image storage. So i set only good ones
				switch (json.weather[0].main) {
					case 'Clouds':
						image.src = 'assets/img/cloudy.png';
						break;
					case 'Thunderstorm':
						image.src = 'assets/img/thunderstorm.png';
						break;
					case 'Drizzle':
						image.src = 'assets/img/drizzle.png';
						break;
					case 'Rain':
						image.src = 'assets/img/heavy-rain.png';
						break;
					case 'Snow':
						image.src = 'assets/img/snow.png';
						break;
					case 'Clear':
						image.src = 'assets/img/sunny.png';
						break;
				}
				return;
			}
			//and here is bad respose
			container.style.height = '500px';
			weatherMain.style.display = 'none';
			error.style.display = 'block';
			Weatherdetails.style.display = 'none';
			return;
		});
});
