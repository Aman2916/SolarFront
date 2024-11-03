import React, { useState } from "react";
import "./styling.css";

const WeatherDisplay = ({ forecastData }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const currentHourIndex = forecastData.findIndex((hour) => {
    const hourDate = new Date(hour.time);
    return hourDate.getHours() === new Date().getHours();
  });

  const handleNext = () => {
    if (startIndex + itemsPerPage < forecastData.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <div className="weather-container">
      <div className="hourly-forecast">
        <button onClick={handlePrev} disabled={startIndex === 0}>
          ◀
        </button>
        {forecastData
          .slice(startIndex, startIndex + itemsPerPage)
          .map((hour, index) => (
            <div
              className={`forecast-item ${
                index + startIndex === currentHourIndex ? "current" : ""
              }`}
              key={index}
            >
              <p>{hour.time}</p>
              <img src={hour.icon} alt="weather-icon" />
              <p>{hour.temperature}°C</p>
              <p>{hour.cloudcover}% Cloud</p>
            </div>
          ))}
        <button
          onClick={handleNext}
          disabled={startIndex + itemsPerPage >= forecastData.length}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default WeatherDisplay;
