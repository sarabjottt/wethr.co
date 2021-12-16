import React, { useState, useContext, useRef } from 'react';
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
import RecentSearch from './RecentSearch';

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
  const [formActive, setFormActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ query: false, location: true });
  const recent = getLS('recentSearch');
  const inputRef = useRef();

  function fetchWeather(lat, long, query) {
    const dataLatLong = `/api/getWeather?lat=${lat}&long=${long}`;
    const dataQuery = `/api/getWeather?search=${query}`;
    setIsLoading(true);
    setFormActive(false);
    fetch(!query ? dataLatLong : dataQuery)
      .then(res => res.json())
      .then(data => {
        const formatQuery = data.locationData.formatString;
        setWeather(data);
        setSearchQuery(formatQuery);
        setLS('localData', data);
        setLS('searchQuery', formatQuery);
        setLS(
          'recentSearch',
          recent
            ? [...new Set([formatQuery, ...recent.slice(0, 4)])]
            : [formatQuery]
        );
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
        <link rel="shortcut icon" href={Favicon(currently.icon)} />
      </Head>
      <form className={error.query ? 'error' : ''} onSubmit={handleSearch}>
        <input
          ref={inputRef}
          onFocus={() => {
            setFormActive(true);
          }}
          onBlur={() => setError({ ...error, query: false })}
          autoComplete="off"
          id="search-query"
          type="search"
          name="place"
          value={searchQuery}
          onChange={handleChange}
        />
        <button
          onClick={() => {
            setSearchQuery('');
            inputRef.current.focus();
          }}
          type="reset"
          className="search-icon"
          id="clear-input">
          ×
        </button>
        <button
          disabled={isLoading}
          type="submit"
          aria-label={isLoading ? 'Loading' : 'Search'}
          className="search-icon">
          {isLoading ? <LoadingIcon /> : <SearchIcon />}
        </button>
        {error.query && <span>Please enter minimum 3 characters.</span>}
        <RecentSearch
          active={formActive}
          setFormActive={setFormActive}
          setSearchQuery={setSearchQuery}
        />
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
