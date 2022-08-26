'use strict';

const checkRequestSchema = require('./check.schema');
const hooks = require('./check.hooks');

const checkProps = {
  schema: checkRequestSchema,
  ...hooks,
};

module.exports = async function (fastify, opts) {
  fastify.get('/check', checkProps, async function (request, reply) {
    const { weather, temperatureThreshold } = request.data;

    return {
      temperatureCheck: temperatureThreshold >= weather.main.temp,
      cityWeather: {
        city: weather.name,
        description: weather.weather[0].description,
        iconUrl: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
        temp: weather.main.temp,
      },
    };
  });
};
