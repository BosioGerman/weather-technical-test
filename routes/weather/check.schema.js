module.exports = {
  query: {
    required: ['cityName', 'temperatureThreshold'],
    type: 'object',
    properties: {
      cityName: {
        type: 'string',
      },
      temperatureThreshold: {
        type: 'number',
      },
    },
  },
};
