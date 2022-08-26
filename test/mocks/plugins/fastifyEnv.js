'use strict';

const fp = require('fastify-plugin');
/**
 * Mock config
 */
module.exports = fp(
  async function (fastify, opts) {
    fastify.decorate('config', {
      OPENWEATHERMAP_APIKEY: '',
      OPENWEATHERMAP_BASEURL: '',
    });
  },
  {
    name: 'fastifyEnv',
  }
);
