module.exports = {
  preHandler: async function (request, reply, done) {
    const { cityName, temperatureThreshold } = request.query;

    const fastify = this;
    if (!cityName) {
      reply.code(400);
      done(new Error("'cityName' has invalid value"));
      return;
    }
    if (!temperatureThreshold) {
      reply.code(400);
      done(new Error("'temperatureThreshold' has invalid value"));
      return;
    }
    try {
      const weather = await fastify.services.openweathermap.getCityWeather({
        cityName,
        countryCode: 'AR',
      });

      request.data = {
        weather,
        temperatureThreshold,
      };
      done();
    } catch (err) {
      reply.code(400);
      done(new Error("'cityName' is not a valid city name"));
    }
  },
};
