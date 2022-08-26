const mockRioCuarto = {
  coord: {
    lon: -64.3499,
    lat: -33.1307,
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      iconUrl: '01d',
    },
  ],
  base: 'stations',
  main: {
    temp: 26.87,
    feels_like: 26.06,
    temp_min: 26.37,
    temp_max: 26.87,
    pressure: 1012,
    humidity: 22,
  },
  visibility: 10000,
  wind: {
    speed: 8.75,
    deg: 20,
  },
  clouds: {
    all: 0,
  },
  dt: 1661374680,
  sys: {
    type: 1,
    id: 8252,
    country: 'AR',
    sunrise: 1661337913,
    sunset: 1661378084,
  },
  timezone: -10800,
  id: 3838874,
  name: 'Río Cuarto',
  cod: 200,
};
module.exports = {
  mockRioCuarto,
};
