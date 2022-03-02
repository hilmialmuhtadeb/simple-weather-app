const getWeather = async ({ lat, long }) => {
  // let city = await fetch(`http://api.positionstack.com/v1/reverse?access_key=[API_KEY]&query=${lat},${long}`);
  city = await city.json();
  city = city.data[0].county;

  let weather = await fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${city}&lat=0&lon=0&lang=null&units=imperial`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      // "x-rapidapi-key": "API_KEY"
    }
  });
  weather = await weather.json();

  return weather;
}

const showPosition = async (position) => {
  const location = {
    lat: position.coords.latitude,
    long: position.coords.longitude,
  };

  const fullWeather = await getWeather(location);

  console.log(fullWeather);

  const city = document.getElementById('city');
  const temperature = document.getElementById('temperature');
  const weather = document.getElementById('weather');
  const celcius = Math.ceil((fullWeather.main.temp - 32) * 5 / 9);

  city.innerText = fullWeather.name;
  temperature.innerText = celcius;
  weather.innerText = fullWeather.weather[0].main;
}

const showError = (error) => {
  console.log('error, user not permit');
}

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log('not support geo location');
  }
}

getLocation();