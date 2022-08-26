const Fastify = require('fastify');
const Services = require('../../plugins/services');
const mockFastifyEnv = require('../mocks/plugins/fastifyEnv');
const { mockAxiosIntance } = require('../mocks/axios');
const { mockRioCuarto } = require('../fixtures/openWeatherMap');

/**
 * Mock instance creator
 */
jest.mock('axios', () => ({
  create: () => ({
    get: () => ({
      data: mockRioCuarto,
    }),
  }),
}));

describe('Plugin: services', () => {
  it('should register the plugin', async () => {
    const fastify = Fastify();

    // Mock fastifyEnv plugin
    fastify.register(mockFastifyEnv);

    // Register services plugin
    fastify.register(Services);

    await fastify.ready();

    expect(fastify.services).toBeDefined();
  });

  describe('OpenWeatherMap service', () => {
    it('should exists openweathermap object', async () => {
      const fastify = Fastify();

      // Mock fastifyEnv plugin
      fastify.register(mockFastifyEnv);

      // Register services plugin
      fastify.register(Services);

      await fastify.ready();

      expect(fastify.services.openweathermap).toBeDefined();
    });

    describe('function: getCityWeather', () => {
      it('should exists', async () => {
        const fastify = Fastify();

        // Mock fastifyEnv plugin
        fastify.register(mockFastifyEnv);

        // Register services plugin
        fastify.register(Services);

        await fastify.ready();

        expect(fastify.services.openweathermap.getCityWeather).toBeDefined();
        expect(typeof fastify.services.openweathermap.getCityWeather).toBe('function');
      });

      // TODO: Test if the service return the data??
      it('should return city weather data', async () => {
        // Mock axios

        const fastify = Fastify();

        // Mock fastifyEnv plugin
        fastify.register(mockFastifyEnv);

        // Register services plugin
        fastify.register(Services);

        await fastify.ready();

        // Fetch weather data
        const parameters = {
          cityName: 'Rio Cuarto',
          countryCode: 'AR',
        };
        const weatherData = await fastify.services.openweathermap.getCityWeather(parameters);

        expect(weatherData).toEqual(mockRioCuarto);
      });
    });
  });
});
