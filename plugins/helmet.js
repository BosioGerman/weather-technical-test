'use strict';

const fp = require('fastify-plugin');
/**
 * Register Helmet for security enhancers
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/helmet'), { contentSecurityPolicy: false });
});
