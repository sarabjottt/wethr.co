import React from 'react';

export function toCelsius(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}
export function setLS(key, data) {
  const dataToSet = JSON.stringify(data);
  localStorage.setItem(key, dataToSet);
}
export function getLS(key) {
  const dataToGet = localStorage.getItem(key);
  return JSON.parse(dataToGet);
}
export function clearCache() {
  const timeSinceLastFetch = Date.now() - getLS('lastCached');
  if (timeSinceLastFetch >= 300000) {
    localStorage.removeItem('weatherData');
  }
}

export const LoadingIcon = ({ size = 24, color = '#000000' }) => (
  <svg
    title="Loading Icon"
    className="loading-icon"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
  </svg>
);
export const SearchIcon = ({ size = 24, color = '#000000' }) => (
  <svg
    title="Search Icon"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
export const LocationIcon = ({ size = 24, color = '#000000' }) => (
  <svg
    title="Location Icon"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const Favicon = icon => {
  switch (icon) {
    case '01d':
      return '/favicons/clear-day.png';
    case '01n':
      return '/favicons/clear-night.png';
    case '10d' || '10n':
      return '/favicons/rain.png';
    case '13d' || '13n':
      return '/favicons/snow.png';
    case 'sleet':
      return '/favicons/sleet.png';
    case '50d' || '50n':
      return '/favicons/wind.png';
    case 'fog':
      return '/favicons/fog.png';
    case '03d' || '03n':
      return '/favicons/cloud.png';
    case '04n':
      return '/favicons/partly-cloudy-night.png';
    case '04d':
      return '/favicons/partly-cloudy-day.png';
    case '11d':
      return '/favicons/thunderstorm.png';
    case 'tornado':
      return '/favicons/tornado.png';
    default:
      return '/favicons/clear-day.png';
  }
};
