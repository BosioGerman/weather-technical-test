'use strict';

const fp = require('fastify-plugin');
const { getCityWeatherBuilder } = require('../services/openWeatherMap');
const axios = require('axios');

module.exports = fp(async function (fastify, opts) {
  const { OPENWEATHERMAP_APIKEY, OPENWEATHERMAP_BASEURL } = fastify.config;

  const axiosInstance = axios.create({
    ...(OPENWEATHERMAP_BASEURL && {
      baseURL: OPENWEATHERMAP_BASEURL,
    }),
    ...(OPENWEATHERMAP_APIKEY && {
      params: {
        appId: OPENWEATHERMAP_APIKEY,
      },
    }),
  });

  fastify.decorate('services', {
    openweathermap: {
      getCityWeather: getCityWeatherBuilder(axiosInstance),
    },
  });
});
