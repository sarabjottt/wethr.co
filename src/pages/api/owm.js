async function getRegion(clientIP) {
  const { latitude: lat, longitude: long } = await fetch(
    `https://ipapi.co/${clientIP}/json/`
  ).then(res => res.json())
  .then(res =>  {
    console.log(res);
    if (res.error) { 
      return { 
        latitude: -37.81, 
        longitude: 144.9644, 
      }; 
  } 
    else { 
      return res; 
    }})
  .catch(err => console.log(err));  
  const weatherData = await fetchCurrentWeather(lat, long, false);
  return weatherData
}

async function fetchCurrentWeather(lat, long, search) {
  const geoAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.OWM_API}&units=imperial`;
  const reGeoAPI = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.OWM_API}&units=imperial`;
  if (search) {
    const weatherData = await fetch(reGeoAPI)
      .then(res => res.json())
      .catch(err => err.name);
    const hourlyData = await fetchHourlyWeather(weatherData.coord.lat, weatherData.coord.lon);
    return {
      weatherData: {...weatherData, hourly: hourlyData.list},
      locationData: {
        city: weatherData.name,
        countryCode: weatherData.sys.country,
        formatString: `${weatherData.name}, ${weatherData.sys.country}`,
      }};
    } else {
      const weatherData = await fetch(geoAPI)
      .then(res => res.json())
      .catch(err => err.name);
      const hourlyData = await fetchHourlyWeather(weatherData.coord.lat, weatherData.coord.lon);
    return {
      weatherData: {...weatherData, hourly: hourlyData.list},
      locationData: {
        city: weatherData.name,
        countryCode: weatherData.sys.country,
        formatString: `${weatherData.name}, ${weatherData.sys.country}`,
      }
    }
  }
}
async function fetchHourlyWeather(lat, long) {
  const geoAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${process.env.OWM_API}&cnt=12&units=imperial`;
  const houlry = await fetch(geoAPI)
    .then(res => res.json())
    .catch(err => err.name);
  return houlry;
}
module.exports = async (req, res) => {
  const { lat, long } = req.query;
  const { region } = req.query;
  const { search } = req.query;
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // case 1: search query
  if (search) {
    try {
      const searchData = await fetchCurrentWeather(false,false,search);
      return res.status(200).send(searchData);
    } catch (error) {
      return res.status(500).send(error.name.toString());
    }
  }
  // case 2: estimate region
  if (region === 'true') {
    try {
      const regionData = await getRegion(clientIP);
      return res.status(200).send(regionData);
    } catch (error) {
      // console.log(error);
      return res.status(500).send(error.toString());
    }
  }
  // case 3: browser locate
  if (!lat || !long) {
    return res
      .status(500)
      .send('Error: Missing Latitude (and/or) Longitude attributes');
  }
  try {
    const weatherData = await fetchCurrentWeather(lat, long, false);
    return res.status(200).send(weatherData);
  } catch (err) {
    return res.status(500).send(err.toString());
  }
};