'use strict';

const fp = require('fastify-plugin');
const configSchema = require('../common/configSchema');
/**
 * Plugin to read .env
 */
module.exports = fp(
  async function (fastify, opts) {
    fastify.register(require('@fastify/env'), {
      confKey: 'config',
      dotenv: process.env.NODE_ENV === 'dev',
      schema: configSchema,
      data: process.env,
    });
  },
  {
    name: 'fastifyEnv',
  }
);
