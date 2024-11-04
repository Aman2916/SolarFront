import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import AirConditions from "./components/AirConditions";
import TodayForecast from "./components/TodayForecast";
import WeeklyForecast from "./components/WeeklyForecast";
import Navbar from "./components/Navbar";
import BackgroundImage from "./components/Backgroundimage";
import "./weather.css";

const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");

  const handleSearch = async (latitude, longitude, city) => {
    setLocation(city);
    try {
      const response = await axios.get(OPEN_METEO_URL, {
        params: {
          latitude,
          longitude,
          hourly:
            "temperature_2m,wind_speed_10m,cloud_cover_mid,relative_humidity_2m,apparent_temperature,shortwave_radiation,weather_code",
          daily:
            "temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code",
          timezone: "auto",
        },
      });

      // Aggregate hourly data into daily sums

      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="w-full border-[1.5px] min-h-screen flex flex-col justify-center border-white rounded-2xl">
        <BackgroundImage image={"url('/imgs/bg.jpg')"} />
        {/* <Row>
        <Col>
          <Navbar />
        </Col>
      </Row> */}
        <div className="w-full flex justify-center items-center text-center pt-4">
          <div>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        {weatherData && (
          <div className="p-4 min-h-full flex w-full">
            {/* Left Column - Current Weather, Air Conditions, Today's Forecast */}
            <div md={4} className="w-[65%] min-h-full">
              <div className="min-h-full flex flex-col justify-between">
                <CurrentWeather weatherData={weatherData} location={location} />
                <AirConditions weatherData={weatherData} />
                <TodayForecast weatherData={weatherData} />
              </div>
            </div>

            {/* Right Column - Weekly Forecast */}
            <div className="w-[35%] min-h-full">
              <WeeklyForecast weatherData={weatherData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
