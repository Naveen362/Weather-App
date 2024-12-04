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
          'https://c4.wallpaperflare.com/wallpaper/455/771/723/sunrise-cloudy-weather-waves-red-sandy-beach-beautiful-landscape-wallpapers-for-desktop-computers-laptop-tablet-and-mobile-phones-3840%C3%972400-wallpaper-preview.jpg')
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
      'data:image/jpeg;base64,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'
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
