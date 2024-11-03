import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import AirConditions from "./components/AirConditions";
import TodayForecast from "./components/TodayForecast";
import WeeklyForecast from "./components/WeeklyForecast";
import { Container, Row, Col } from "react-bootstrap";
import "./weather.css";

const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");

  const handleSearch = async (latitude, longitude) => {
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
    <Container fluid className="app-container">
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <SearchBar onSearch={handleSearch} />
        </Col>
      </Row>

      {weatherData && (
        <Row className="mt-4">
          {/* Left Column - Current Weather, Air Conditions, Today's Forecast */}
          <Col md={8}>
            <div className="left-column">
              <CurrentWeather weatherData={weatherData} location={location} />
              <AirConditions weatherData={weatherData} />
              <TodayForecast weatherData={weatherData} />
            </div>
          </Col>

          {/* Right Column - Weekly Forecast */}
          <Col md={4}>
            <WeeklyForecast weatherData={weatherData} />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
