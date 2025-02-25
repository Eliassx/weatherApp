import Image from "../components/Image";
import SearchCity from "./SearchCity";
import { Wind, Waves } from "@phosphor-icons/react";

import { useState } from "react";

import clearPNG from "../assets/clear.png";
import rainPNG from "../assets/rain.png";
import cloudPNG from "../assets/cloud.png";
import snowPNG from "../assets/snow.png";
import mistPNG from "../assets/mist.png";
import notFoundIcon from "../assets/404.png";

function WeatherInformations() {
  const [weather, setWeather] = useState([]);

  const allIcons = {
    "01d": clearPNG,
    "01n": clearPNG,
    "02d": clearPNG,
    "02n": clearPNG,
    "03d": cloudPNG,
    "03n": cloudPNG,
    "04d": cloudPNG,
    "04n": cloudPNG,
    "09d": rainPNG,
    "09n": rainPNG,
    "10d": rainPNG,
    "10n": rainPNG,
    "11d": rainPNG,
    "11n": rainPNG,
    "13d": snowPNG,
    "13n": snowPNG,
    "50d": mistPNG,
    "50n": mistPNG,
  };

  const weatherCity = async (city) => {
    const APIKey = "";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    );

    const data = await response.json();
    console.log(data);

    if (data.cod === "404") {
      const weatherInformations = document.querySelector(
        ".weatherInformations"
      );
      const notFound = document.querySelector(".notFound");

      notFound.style.display = "flex";
      weatherInformations.style.display = "none";

      setWeather({
        message: data.message,
        icon: notFoundIcon,
      });
    }

    const icon = allIcons[data.weather[0].icon];

    setWeather({
      name: data.name,
      temperature: Math.floor(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: Math.floor(data.wind.speed),
      icon: icon,
    });
  };

  function getWeather() {
    const information = document.querySelector(".information");
    const weatherInformations = document.querySelector(".weatherInformations");
    const notFound = document.querySelector(".notFound");

    notFound.style.display = "none";
    weatherInformations.style.display = "flex";

    notFound.classList.add("fade-in");
    weatherInformations.classList.add("fade-in");
    information.style.height = "600px";
  }

  return (
    <div className="information">
      <SearchCity weatherCity={weatherCity} getWeather={getWeather} />
      <div className="weatherInformations">
        <div className="image-temperature">
          <Image src={weather.icon} />

          <div className="name-weather">
            <article className="temperature">{weather.temperature}°</article>
            <h3 className="city">{weather.name}</h3>
          </div>
        </div>

        <div className="humidity-windSpeed">
          <div className="humidity">
            <div className="humidityContent">
              <Waves size={32} />
              <span>{weather.humidity}%</span>
            </div>
            <p>Humidity</p>
          </div>
          <div className="windSpeed">
            <div className="windContent">
              <Wind size={32} />
              <span>{weather.windSpeed} Km/h</span>
            </div>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>

      <div className="notFound">
        <div className="notFoundImg">
          <Image src={weather.icon} />
        </div>
        <div className="notFoundMessage">
          <h3 className="message">{weather.message}</h3>
        </div>
      </div>
    </div>
  );
}

export default WeatherInformations;
