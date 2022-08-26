module.exports = {
  type: 'object',
  required: ['OPENWEATHERMAP_APIKEY', 'OPENWEATHERMAP_BASEURL'],
  properties: {
    OPENWEATHERMAP_APIKEY: {
      type: 'string',
      default: '',
    },
    OPENWEATHERMAP_BASEURL: {
      type: 'string',
      default: '',
    },
    CACHE_TTL_SECONDS: {
      type: 'number',
      default: 600,
    },
    CACHE_CHECK_PERIOD_SECONDS: {
      type: 'number',
      default: 120,
    },
  },
};
