'use strict';

const Fastify = require('fastify');
const Cache = require('../../plugins/cache');
const mockFastifyEnv = require('../mocks/plugins/fastifyEnv');
jest.mock('axios');

describe('Plugin: cache', () => {
  it('should register the plugin', async () => {
    const fastify = Fastify();

    // Mock fastifyEnv plugin
    fastify.register(mockFastifyEnv);

    await fastify.register(async (instance, options) => {
      instance.addHook('onRequest', async function (req, reply) {
        expect(instance[Symbol.for('cache.registered')]).toBe(false);
      });
    });

    // Register cache plugin
    fastify.register(Cache);

    // should register onRequest hook
    await fastify.register(async (instance, options) => {
      instance.addHook('onRequest', async function (req, reply) {
        expect(instance[Symbol.for('cache.registered')]).toBe(true);
      });
    });

    await fastify.ready();
  });

  describe('OpenWeatherMap service', () => {
    it('should cache GET responses', async () => {
      const fastify = Fastify();

      // Mock fastifyEnv plugin
      fastify.register(mockFastifyEnv);

      // Register cache plugin
      fastify.register(Cache);

      // Register dummy route
      fastify.get('/dummy', (req, reply) => {
        return reply.send({ time: Date.now() });
      });

      await fastify.ready();

      // Request dummy route
      const firstResponse = await fastify.inject({
        url: '/dummy?param=first',
        method: 'GET',
      });
      const secondResponse = await fastify.inject({
        url: '/dummy?param=other',
        method: 'GET',
      });
      const thirdResponse = await fastify.inject({
        url: '/dummy?param=first',
        method: 'GET',
      });

      // All responses should be ok
      expect(firstResponse.statusCode).toEqual(200);
      expect(secondResponse.statusCode).toEqual(200);
      expect(thirdResponse.statusCode).toEqual(200);

      const firstBody = firstResponse.json();
      const secondBody = secondResponse.json();
      const thirdBody = thirdResponse.json();

      // request with same url must have same body
      expect(firstBody).toEqual(thirdBody);
      expect(firstBody).not.toEqual(secondBody);

      // Cached response must have cache-control header
      expect(Object.keys(thirdResponse.headers)).toContain('cache-control');
    });
  });
});
