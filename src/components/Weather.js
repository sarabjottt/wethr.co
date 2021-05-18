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
      weatherData: { currently },
    },
  } = useContext(GlobalState);

  return (
    <div className={`app-wrapper bg-${currently.icon}`}>
      <div className="search-container">
        <Search />
      </div>
      <div className="hero-container">
        <div className="current-temp">
          <h1>
            {isFern
              ? Math.round(currently.temperature)
              : toCelsius(currently.temperature)}
            °
          </h1>
        </div>
        <div className="apparent-temp">
          <p>
            Feels like{' '}
            <b>
              {isFern
                ? Math.round(currently.apparentTemperature)
                : toCelsius(currently.apparentTemperature)}
              °
            </b>
          </p>
        </div>
      </div>
      <div className="summery-container">
        <h2>{currently.summary}</h2>
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
          <li>{Math.round(currently.humidity * 100)}%</li>
          <li>{Math.round(currently.visibility * 1.609)} km</li>
          <li>{Math.round(currently.windSpeed * 1.609)} k/h</li>
          <li>{Math.round(currently.precipProbability * 100)}%</li>
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
        <div className={`weather-icon ${currently.icon}`} />
      </div>
    </div>
  );
}
