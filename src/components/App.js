import React, { useState, useEffect } from 'react';
import { GlobalState, themes } from './GlobalState';
import Weather from './Weather';
import { getLS, setLS } from './Helper';

export default function App() {
  const [isFern, setIsFern] = useState(false);
  const [weather, setWeather] = useState(null);
  const [theme, setTheme] = useState(themes.light);

  function fetchWeather(lat, long) {
    const api = `/api/getWeather?lat=${lat}&long=${long}`;
    const apiRegion = `/api/getWeather?region=true`;
    console.log('function called...');
    fetch(!lat ? apiRegion : api)
      .then(res => res.json())
      .then(data => {
        console.log('Data:', data);
        setWeather(data);
        setLS('localData', data);
        setLS('lastCached', Date.now());
      });
  }

  useEffect(() => {
    setIsFern(getLS('isFern'));
    setWeather(getLS('localData'));
    if (!getLS('localData')) {
      fetchWeather();
    }
    const timeSinceLastFetch = Date.now() - getLS('lastCached');
    if (timeSinceLastFetch >= 5 * 60000) {
      if (getLS('lastCords')) {
        const { lat, long } = getLS('lastCords');
        fetchWeather(lat, long);
      }
    }
  }, []);

  useEffect(() => {
    const strings = ['clear-night', 'partly-cloudy-night', 'thunderstorm'];
    if (weather && strings.includes(weather.weatherData.currently.icon)) {
      console.log('its dark time');
      setTheme(themes.dark);
    } else {
      console.log('its light time');
      setTheme(themes.light);
    }
  }, [weather]);

  return weather ? (
    <GlobalState.Provider
      value={{ theme, weather, setWeather, isFern, setIsFern }}>
      <Weather />
    </GlobalState.Provider>
  ) : (
    <div className="loading">
      <div className="card">
        <h1>Weather Forecast</h1>
        <h2>Allow location to access.</h2>
      </div>
    </div>
  );
}