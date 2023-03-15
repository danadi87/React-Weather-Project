import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [loaded, setLoaded] = useState(false);
  let [city, setCity] = useState(null);
  let [weather, setWeather] = useState(null);
  function displayWeather(response) {
    setLoaded(true);
    console.log(response.data);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = `ff7ebdc6e7879a14c24fac0169b98522`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={updateCity}
      />
      <button type="submit" className="search" value="Search">
        Search
      </button>
    </form>
  );
  if (loaded) {
    return (
      <div className="Weather">
        {form}
        <h3>{city}</h3>
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}ºC</li>
          <li>Description: {weather.description}</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>
            <img src={weather.icon} alt="Weather Icon" />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
