import React, { useState, useContext } from 'react';
import Head from 'next/head';
import { GlobalState } from './GlobalState';
import {
  getLS,
  setLS,
  LoadingIcon,
  SearchIcon,
  LocationIcon,
  Favicon,
} from './Helper';

export default function Search() {
  const {
    setWeather,
    weather: {
      locationData: { formatString },
      weatherData: { currently },
    },
  } = useContext(GlobalState);

  const [searchQuery, setSearchQuery] = useState(
    getLS('searchQuery') || formatString
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ query: false, location: true });

  function fetchWeather(lat, long, query) {
    const dataLatLong = `/api/getWeather?lat=${lat}&long=${long}`;
    const dataQuery = `/api/getWeather?search=${query}`;
    setIsLoading(true);
    fetch(!query ? dataLatLong : dataQuery)
      .then(res => res.json())
      .then(data => {
        const formatQuery = data.locationData.formatString;
        setWeather(data);
        setSearchQuery(formatQuery);
        setLS('localData', data);
        setLS('searchQuery', formatQuery);
        setLS('lastCords', {
          lat: data.weatherData.latitude,
          long: data.weatherData.longitude,
        });
        setLS('lastCached', Date.now());
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError({ ...error, query: true });
      });
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.length < 3 || !/^[^-\s][\w\s,]+$/.test(searchQuery)) {
      setError({ ...error, query: true });
    } else {
      fetchWeather(null, null, searchQuery);
    }
  }
  function handleChange(e) {
    setSearchQuery(e.target.value);
    setError({ ...error, query: false });
  }
  function handleLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const long = position.coords.longitude;
          const lat = position.coords.latitude;
          setError({ ...error, location: false });
          setLS('locationAccess', true);
          fetchWeather(lat, long, null);
        },
        () => {
          setError({ ...error, location: true });
          localStorage.removeItem('locationAccess');
        }
      );
    }
  }
  return (
    <div className="search">
      <Head>
        {formatString && (
          <title>
            {getLS('searchQuery') || formatString} - Weather Forecast | wethr.co
          </title>
        )}
        {console.log(Favicon(currently.icon))}
        <link rel="shortcut icon" href={Favicon(currently.icon)} />
      </Head>
      <form className={error.query ? 'error' : ''} onSubmit={handleSearch}>
        <input
          autoComplete="off"
          id="search-query"
          type="search"
          name="place"
          value={searchQuery}
          onChange={handleChange}
        />
        <input
          id="search-submit"
          disabled={isLoading}
          type="submit"
          value=""
          name="search"
        />
        <label
          aria-label={isLoading ? 'Loading' : 'Search'}
          className="search-icon"
          htmlFor="search-submit">
          {isLoading ? <LoadingIcon /> : <SearchIcon />}
        </label>
        {error.query && <span>Please enter minimum 3 characters.</span>}
      </form>
      <button
        aria-label="Auto Locate"
        id={!error.location ? 'given' : 'denied'}
        className="locate-btn"
        type="button"
        onClick={handleLocation}>
        <LocationIcon />
      </button>
      {error.location && (
        <span aria-label="location error" className="location-tip">
          Allow location access from your browser.
        </span>
      )}
    </div>
  );
}
