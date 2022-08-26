const fastify = require('fastify');
const fp = require('fastify-plugin');
const app = require('../../app');

/**
 * @returns {import('fastify').FastifyInstance}
 */
module.exports = function setupTestEnvironment() {
  // setup fastify server
  const server = fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'silent',
    },
    pluginTimeout: 2 * 60 * 1000,
  });

  // setup test lifecycle hooks
  beforeAll(async () => {
    server.register(fp(app));
    await server.ready();
  });

  beforeEach(async () => {});

  afterEach(async () => {});

  afterAll(async () => {
    await server.close();
  });

  return server;
};
