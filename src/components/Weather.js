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
      weatherData: { currently: c, hourly },
    },
  } = useContext(GlobalState);

  return (
    <div
      style={{ minHeight: window.outerHeight }}
      className={`app-wrapper bg-${c.icon}`}>
      <div className="search-container">
        <Search />
      </div>
      <div className="hero-container">
        <div className="current-temp">
          <h1>
            {isFern ? Math.round(c.temperature) : toCelsius(c.temperature)}°
          </h1>
        </div>
        <div className="apparent-temp">
          <p>
            Feels like{' '}
            <b>
              {isFern
                ? Math.round(c.apparentTemperature)
                : toCelsius(c.apparentTemperature)}
              °
            </b>
          </p>
        </div>
      </div>
      <div className="hour-summery-container">
        <p>{hourly.summary}</p>
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
          <li>{Math.round(c.humidity * 100)}%</li>
          {isFern ? (
            <li>{Math.round(c.visibility)} mph</li>
          ) : (
            <li>{Math.round(c.visibility * 1.609)} km/h</li>
          )}
          {isFern ? (
            <li>{Math.round(c.windSpeed)} mph</li>
          ) : (
            <li>{Math.round(c.windSpeed * 1.609)} km/h</li>
          )}
          <li>{Math.round(c.precipProbability * 100)}%</li>
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
        <div className={`weather-icon ${c.icon}`} />
      </div>
      <div className="summery-container">
        <h2>{c.summary}</h2>
      </div>
    </div>
  );
}
