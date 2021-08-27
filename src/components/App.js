import React, { useState, useEffect } from 'react';
import { GlobalState, themes } from './GlobalState';
import Weather from './Weather';
import { getLS, setLS } from './Helper';
import Loading from './Loading';

export default function App() {
  const [isFern, setIsFern] = useState(false);
  const [weather, setWeather] = useState(null);
  const [theme, setTheme] = useState(themes.light);

  function fetchWeather(lat, long) {
    const dataLatLong = `/api/getWeather?lat=${lat}&long=${long}`;
    const dataRegion = `/api/getWeather?region=true`;
    fetch(!lat ? dataRegion : dataLatLong)
      .then(res => res.json())
      .then(data => {
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
      setTheme(themes.dark);
    } else {
      setTheme(themes.light);
    }
  }, [weather]);

  return weather ? (
    <GlobalState.Provider
      value={{ theme, weather, setWeather, isFern, setIsFern }}>
      <Weather />
    </GlobalState.Provider>
  ) : (
    <Loading />
  );
}
