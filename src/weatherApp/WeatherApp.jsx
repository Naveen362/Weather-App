import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weather.css';

export default function WeatherApp() {
  const [city, setCity] = useState('Delhi'); // Default city is Delhi
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localTime, setLocalTime] = useState('');
  const [inputValue, setInputValue] = useState(''); // To track user input
  const [imagechange, setimagechange] = useState(
    'https://img.freepik.com/free-photo/overcast-clouds-mountain-cityscape_23-2148182920.jpg?ga=GA1.1.200709813.1732007863&semt=ais_hybrid'
  );

  const API_KEY = '2cf2677b837431c48086978bf6824812'; // Replace with your OpenWeatherMap API key

  // Fetch weather data when the city changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        setWeatherData(response.data);
        updateLocalTime(response.data.timezone);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again.');
        console.error('Error fetching weather data:', err);
      }
      setLoading(false);
    };

    fetchWeatherData();
  }, [city]);

  // Update local time based on timezone offset
  const updateLocalTime = (timezoneOffset) => {
    const interval = setInterval(() => {
      const utcTime = new Date();
      const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000);
      setLocalTime(localTime.toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  };

  // Change background image based on weather description
  const weatherdes = (description) => {
    switch (description) {
      case 'smoke':
        setimagechange(
          'https://img.freepik.com/free-photo/abstract-dense-blue-waving-fog_23-2148101969.jpg?ga=GA1.1.200709813.1732007863&semt=ais_hybrid'
        );
        break;
      case 'thunderstorm':
        setimagechange(
          'https://img.freepik.com/free-vector/thunderstorm-lake-scene_1308-24906.jpg?ga=GA1.1.200709813.1732007863&semt=ais_hybrid'
        );
        break;
      case 'drizzle':
        setimagechange(
          'https://img.freepik.com/free-vector/monsoon-rainfall-with-clouds-background_1017-32365.jpg?ga=GA1.1.200709813.1732007863&semt=ais_hybrid'
        );
        break;
      case 'rain':
        setimagechange(
          'https://img.freepik.com/free-vector/monsoon-rainfall-with-clouds-background_1017-32365.jpg?ga=GA1.1.200709813.1732007863&semt=ais_hybrid'
        );
        break;
      case 'snow':
        setimagechange(
          'https://img.freepik.com/free-photo/beautiful-winter-snowy-mountain-landscape_1150-31992.jpg?ga=GA1.1.200709813.1732007863&semt=ais_hybrid'
        );
        break;
      case 'mist':
        setimagechange(
          'https://img.freepik.com/free-photo/misty-forest-road-journey-nature-background_1150-7562.jpg?ga=GA1.1.200709813.1732007863&semt=ais_hybrid'
        );
        break;
      case 'clear sky':
        setimagechange(
          'https://img.freepik.com/free-photo/sky_23-2148098540.jpg?ga=GA1.1.200709813.1732007863&semt=ais_hybrid'
        );
        break;
      case 'few clouds':
        setimagechange(
          'https://img.freepik.com/free-photo/scenic-sunset-beautiful-clouds-sky_1150-4152.jpg?ga=GA1.1.200709813.1732007863&semt=ais_hybrid'
        );
        break;
      case 'scattered clouds':
        setimagechange(
          'https://img.freepik.com/free-photo/scenic-sunset-beautiful-clouds-sky_1150-4152.jpg?ga=GA1.1.200709813.1732007863&semt=ais_hybrid'
        );
        break;
      case 'broken clouds':
        setimagechange(
          'https://img.freepik.com/free-photo/scenic-sunset-beautiful-clouds-sky_1150-4152.jpg?ga=GA1.1.200709813.1732007863&semt=ais_hybrid'
        );
        break;
      case 'haze':
        setimagechange(
          'https://img.freepik.com/free-photo/misty-forest-road-journey-nature-background_1150-7562.jpg?ga=GA1.1.200709813.1732007863&semt=ais_hybrid'
        );
        break;
      case 'dust':
        setimagechange(
          'https://img.freepik.com/free-vector/gray-wood-christmas-background_1048-3917.jpg?ga=GA1.1.200709813.1732007863&semt=ais_hybrid'
        );
        break;
      case 'fog':
        setimagechange(
          'https://img.freepik.com/free-photo/misty-forest-road-journey-nature-background_1150-7562.jpg?ga=GA1.1.200709813.1732007863&semt=ais_hybrid'
        );
        break;
      case 'ash':
        setimagechange(
          'https://img.freepik.com/free-vector/gray-wood-christmas-background_1048-3917.jpg?ga=GA1.1.200709813.1732007863&semt=ais_hybrid'
        );
        break;
      default:
        setimagechange(
          'https://img.freepik.com/free-photo/overcast-clouds-mountain-cityscape_23-2148182920.jpg?ga=GA1.1.200709813.1732007863&semt=ais_hybrid'
        );
    }
  };

  // Update background image when weather data changes
  useEffect(() => {
    if (weatherData && weatherData.weather[0]?.description) {
      weatherdes(weatherData.weather[0].description);
    }
  }, [weatherData]);

  // Handle user input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      setCity(inputValue);
      setInputValue('');
    }
  };

  const clearCity = () => {
    setInputValue('');
    setCity('');
    setWeatherData(null);
    setLocalTime('');
    setimagechange(
      'https://img.freepik.com/free-photo/overcast-clouds-mountain-cityscape_23-2148182920.jpg?ga=GA1.1.200709813.1732007863&semt=ais_hybrid'
    );
  };

  return (
    <div
      className="nefn"
      style={{
        backgroundImage: `url(${imagechange})`,
        backgroundSize: 'cover',
        height: '100vh',
      }}
    >
      <h1 className="text-center fst-italic">Weather Report</h1>
      <div className="container mt-5">
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-3"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter city"
              />
              <button type="submit" className="btn btn-primary me-5 mb-3">
                Get Weather
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-5 mb-3"
                onClick={clearCity}
              >
                Clear
              </button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}

            {weatherData && (
              <div className="card bg-white text-dark p-5 mt-5 rounded shadow">
                <div className="card-body row">
                  <h5 className="card-title">{weatherData.name}</h5>
                  <hr />
                  <p className="card-text">Time: {localTime}</p>
                  <p className="card-text">
                    Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C
                  </p>
                  <p className="card-text">
                    Description: {weatherData.weather[0].description}
                  </p>
                  <p className="card-text">Humidity Level: {weatherData.main.humidity}%</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
