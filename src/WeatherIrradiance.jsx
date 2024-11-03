// WeatherIrradiance.js
import { Line } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import "./App.scss";
import WeatherDisplay from "./WeatherDisplay";
const WeatherIrradiance = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [irradianceData, setIrradianceData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const latitude = "22.7196"; // Example for Indore, replace as needed
  const longitude = "75.8577"; // Example for Indore, replace as needed

  useEffect(() => {
    // Fetch data from OpenMeteo
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,cloudcover,direct_normal_irradiance,diffuse_radiation,shortwave_radiation`
      );

      const data = await response.json();

      // Set the weather data
      const hourly = data.hourly;
      const forecastData = hourly.time.slice(0, 24).map((time, index) => ({
        time,
        temperature: hourly.temperature_2m[index],
        cloudcover: hourly.cloudcover[index],
        dhi: data.hourly.diffuse_radiation[index], // Current GHI
        dni: data.hourly.direct_normal_irradiance[index], // Current DNI
        ghi: data.hourly.shortwave_radiation[index], // Current DHI
      }));
      setHourlyData(forecastData);
    };
    fetchWeatherData();
  }, []);
  // setWeatherData({
  //   temperature: data.current_weather.temperature,
  //   cloudcover: data.hourly.cloudcover[0], // Latest cloud cover value
  //   conditions: data.current_weather.weathercode, // Use weather code to show conditions
  // });

  // // Set the irradiance data
  // setIrradianceData({
  //   dhi: data.hourly.diffuse_radiation[0], // Current GHI
  //   dni: data.hourly.direct_normal_irradiance[0], // Current DNI
  //   ghi: data.hourly.shortwave_radiation[0], // Current DHI
  //       // });
  //     } catch (error) {
  //       console.error("Error fetching data from OpenMeteo:", error);
  //     }
  //   };

  //   fetchWeatherAndIrradiance();
  // }, []);

  //  // WeatherForecast.js

  // return (
  //   <div className="weather-forecast">
  //     <h2>24-Hour Weather & Irradiance Forecast</h2>
  //     <div className="hourly-data-container">
  //       {hourlyData.map((data, index) => (
  //         <div key={index} className="hourly-data">
  //           <p>{new Date(data.time).getHours()}:00</p>
  //           <p>Temp: {data.temperature}°C</p>
  //           <p>Cloud Cover: {data.cloudcover}%</p>
  //           <p>GHI: {data.ghi} W/m²</p>
  //           <p>DNI: {data.dni} W/m²</p>
  //           <p>DHI: {data.dhi} W/m²</p>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  const get24HourForecast = (forecastData) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDate();

    // Filter forecast to start from the current hour
    const next24Hours = forecastData.filter((entry) => {
      const entryTime = new Date(entry.time);
      const entryHour = entryTime.getHours();
      const entryDay = entryTime.getDate();

      // Check if the entry is within the next 24 hours
      return (
        (entryDay === currentDay && entryHour >= currentHour) ||
        (entryDay === currentDay + 1 && entryHour < currentHour)
      );
    });

    return next24Hours.slice(0, 24); // Get only 24 hours
  };

  return (
    <div className="weather-box">
      <WeatherDisplay forecastData={hourlyData} />
    </div>
  );
};

export default WeatherIrradiance;
