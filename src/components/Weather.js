import React, { useContext } from 'react';
import { GlobalState } from './GlobalState';
import { setLS, toCelsius } from './Helper';
import Switch from './UI/Switch';
import Search from './Search';
import Chart from './UI/Chart';

export default function Weather() {
  const {
    isFern,
    setIsFern,
    weather: {
      weatherData: { main: c, visibility, wind, rain, weather },
    },
  } = useContext(GlobalState);

  return (
    <div
      // style={{ minHeight: window.outerHeight }}
      className={`app-wrapper bg-${weather[0].main} _${weather[0].icon}`}>
      <div className="search-container">
        <Search />
      </div>
      <div className="hero-container">
        <div className="current-temp">
          <h1>
            {isFern ? Math.round(c.temp) : toCelsius(c.temp)}°
          </h1>
        </div>
        <div className="apparent-temp">
          <p>
            Feels like{' '}
            <b>
              {isFern
                ? Math.round(c.feels_like)
                : toCelsius(c.feels_like)}
              °
            </b>
          </p>
        </div>
      </div>
      <div className="hour-summery-container">
        <p>{weather[0].description}</p>
      </div>
      <div className="chart-container">
        <Chart />
      </div>
      <div className="meta-container">
        <ul className="meta-label">
          <li>Humidity</li>
          <li>Visibility</li>
          <li>Wind</li>
          <li>Rain</li>
        </ul>
        <ul className="meta-value">
          <li>{Math.round(c.humidity)}%</li>
          {isFern ? (
            <li>{Math.round(visibility/1609)} miles</li>
          ) : (
            <li>{Math.round(visibility/1000)} km</li>
          )}
          {isFern ? (
            <li>{Math.round(wind.speed)} mph</li>
          ) : (
            <li>{Math.round(wind.speed * 1.609)} km/h</li>
          )}
          {rain ? <li>{Object.values(rain)[0]} mm/1h</li> : <li>0 mm/1h</li>}
        </ul>
      </div>
      <div className="switch-container">
        <Switch
          isOn={!isFern}
          handleToggle={() => {
            setIsFern(!isFern);
            setLS('isFern', !isFern);
          }}
        />
      </div>
      <div className="icon-container">
        <div className={`weather-icon ${weather[0].main} _${weather[0].icon}`} />
      </div>
      <div className="summery-container">
        <h2>{weather[0].description}</h2>
      </div>
    </div>
  );
}
