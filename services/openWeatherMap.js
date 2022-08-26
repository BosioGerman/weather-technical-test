const getCityWeatherBuilder = (axiosInstance) => {
  return async ({ cityName, countryCode }) => {
    try {
      const { data } = await axiosInstance.get('/weather', {
        params: {
          units: 'metric',
          q: [cityName, countryCode].join(','),
        },
      });
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };
};
module.exports = {
  getCityWeatherBuilder,
};
