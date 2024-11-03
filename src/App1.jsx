import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { getWeatherData, getCoordinates } from "./services/weatherService";
import CurrentWeather from "./components/CurrentWeather";
import WeeklyForecast from "./components/WeeklyForecast";

// function App1() {
//   const [weatherData, setWeatherData] = useState(null);
//   const [location, setLocation] = useState({
//     latitude: 51.5074,
//     longitude: -0.1278,
//   }); // Default coordinates for London
//   const [city, setCity] = useState(""); // User input for city

//   // useEffect(() => {
//   //   const fetchWeather = async () => {
//   //     if (location.latitude && location.longitude) {
//   //       const data = await getWeatherData(
//   //         location.latitude,
//   //         location.longitude
//   //       );
//   //       setWeatherData(data);
//   //     }
//   //   };
//   //   fetchWeather();
//   // }, [location]);
//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         const data = await getWeatherData(latitude, longitude);
//         if (data) {
//           setWeatherData(data);
//         } else {
//           console.error("No data received from the weather service");
//         }
//       } catch (error) {
//         console.error("Error fetching weather data:", error);
//       }
//     };

//     fetchWeather();
//   }, []);

//   const handleSearch = async () => {
//     const coordinates = await getCoordinates(city);
//     if (coordinates) {
//       setLocation(coordinates);
//     } else {
//       alert("City not found. Please try again.");
//     }
//   };

//   return (
//     <Container className="my-4">
//       <Row className="justify-content-center">
//         <Col xs={12} md={6}>
//           <Card className="text-center">
//             <Card.Body>
//               <Form className="mb-3">
//                 <Form.Group controlId="cityInput">
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter city name"
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                   />
//                 </Form.Group>
//                 <Button variant="primary" onClick={handleSearch}>
//                   Search
//                 </Button>
//               </Form>
//               {weatherData && (
//                 <>
//                   <CurrentWeather data={weatherData.current} />
//                   <WeeklyForecast data={weatherData.daily} />
//                 </>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default App1;

// import React, { useState, useEffect } from "react";
// import { getWeatherData, getCoordinates } from "./services/weatherService";

function App1() {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          city
        )}&key=08260aa036494c0e9007d809ede7f0e8`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setLatitude(lat);
        setLongitude(lng);
      } else {
        console.error("No results found for this city.");
      }
    } catch (error) {
      console.error("Error fetching geolocation:", error);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      const fetchWeather = async () => {
        try {
          const data = await getWeatherData(latitude, longitude);

          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };

      fetchWeather();
    }
  }, [latitude, longitude]);
  // const hourlyTemperatures = weatherData.data.hourly.temperature_2m; // Array of hourly temperatures
  const currentHour = new Date().getHours(); // Get current hour in local timezone

  // Ensure that the currentHour matches the hour in the hourlyTemperatures array
  // const currentTemperature = hourlyTemperatures[currentHour];

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {weatherData && (
        <div>
          <h1>Weather Data</h1>
          {/* Display some weather data here */}
          <p>
            Temperature: {weatherData.hourly.temperature_2m[currentHour]} °C
          </p>
        </div>
      )}
    </div>
  );
}

export default App1;
