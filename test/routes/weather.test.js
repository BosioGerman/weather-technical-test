'use strict';

const setupTest = require('../utils/setupTest');
const fastify = setupTest();
const { mockAxiosIntance } = require('../mocks/axios');
const { mockRioCuarto } = require('../fixtures/openWeatherMap');

const testUrl = '/weather/check';
describe('Weather endpoint', () => {
  describe('GET GET /api/weather/check', () => {
    /**
     * Mock axios
     */
    jest.mock('axios', () => mockAxiosIntance(mockRioCuarto));
    it('should return 200 if query parameters are ok', async () => {
      const expectedResponseBody = {
        temperatureCheck: true,
        cityWeather: {
          city: mockRioCuarto.name,
          description: mockRioCuarto.weather[0].description,
          iconUrl: `https://openweathermap.org/img/wn/${mockRioCuarto.weather[0].icon}@2x.png`,
          temp: mockRioCuarto.main.temp,
        },
      };

      const requestQuery = {
        cityName: 'Rio Cuarto',
        temperatureThreshold: 40,
      };

      const serverResponse = await fastify.inject({
        url: testUrl,
        method: 'GET',
        query: requestQuery,
      });

      expect(serverResponse.statusCode).toEqual(200);
      expect(serverResponse.json()).toEqual(expectedResponseBody);
    });

    it('should return temperatureCheck: false if temperatureThreshold is less than city actual temperature', async () => {
      const expectedResponseBody = {
        temperatureCheck: false,
        cityWeather: {
          city: mockRioCuarto.name,
          description: mockRioCuarto.weather[0].description,
          iconUrl: `https://openweathermap.org/img/wn/${mockRioCuarto.weather[0].icon}@2x.png`,
          temp: mockRioCuarto.main.temp,
        },
      };

      const requestQuery = {
        cityName: 'Rio Cuarto',
        temperatureThreshold: 10.5,
      };

      const serverResponse = await fastify.inject({
        url: testUrl,
        method: 'GET',
        query: requestQuery,
      });

      expect(serverResponse.statusCode).toEqual(200);
      expect(serverResponse.json()).toEqual(expectedResponseBody);
    });

    it('should return 400 if cityName is not in the query parameters', async () => {
      const expectedResponseBody = {
        error: 'Bad Request',
        message: "querystring must have required property 'cityName'",
        statusCode: 400,
      };

      const requestQuery = {
        temperatureThreshold: 10,
      };
      const serverResponse = await fastify.inject({
        url: testUrl,
        method: 'GET',
        query: requestQuery,
      });

      expect(serverResponse.statusCode).toEqual(400);
      expect(serverResponse.json()).toEqual(expectedResponseBody);
    });

    it('should return 400 if temperatureThreshold is not in the query parameters', async () => {
      const expectedResponseBody = {
        error: 'Bad Request',
        message: "querystring must have required property 'temperatureThreshold'",
        statusCode: 400,
      };

      const requestQuery = {
        cityName: 'Rio Cuarto',
      };

      const serverResponse = await fastify.inject({
        url: testUrl,
        method: 'GET',
        query: requestQuery,
      });

      expect(serverResponse.statusCode).toEqual(400);
      expect(serverResponse.json()).toEqual(expectedResponseBody);
    });

    it('should return 400 if cityName has an invalid value', async () => {
      const expectedResponseBody = {
        error: 'Bad Request',
        message: "'cityName' has invalid value",
        statusCode: 400,
      };

      const requestQuery = {
        cityName: '',
        temperatureThreshold: 10,
      };
      const serverResponse = await fastify.inject({
        url: testUrl,
        method: 'GET',
        query: requestQuery,
      });

      expect(serverResponse.statusCode).toEqual(400);
      expect(serverResponse.json()).toEqual(expectedResponseBody);
    });

    it('should return 400 if cityName does not exists', async () => {
      const expectedResponseBody = {
        error: 'Bad Request',
        message: "'cityName' is not a valid city name",
        statusCode: 400,
      };

      const requestQuery = {
        cityName: 'unknown',
        temperatureThreshold: 10,
      };
      const serverResponse = await fastify.inject({
        url: testUrl,
        method: 'GET',
        query: requestQuery,
      });

      expect(serverResponse.statusCode).toEqual(400);
      expect(serverResponse.json()).toEqual(expectedResponseBody);
    });
  });
});
