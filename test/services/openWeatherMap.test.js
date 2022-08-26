// jest.mock('axios');
const { mockAxios } = require('../mocks/axios');
const { mockRioCuarto } = require('../fixtures/openWeatherMap');
const { getCityWeatherBuilder } = require('../../services/openWeatherMap');
describe('Services: openWeatherMap', () => {
  it('should exists', async () => {
    expect(typeof getCityWeatherBuilder).toBe('function');
  });

  it('should return city weather data if parameters are ok', async () => {
    // Mock axios
    const axiosMock = {
      get: jest.fn().mockReturnValue(
        Promise.resolve({
          data: mockRioCuarto,
        })
      ),
    };

    // Create getCityWeather service function
    const getCityWeather = getCityWeatherBuilder(axiosMock);

    // Fetch city weather
    const serviceParameters = {
      cityName: 'Rio Cuarto',
      countryCode: 'AR',
    };
    const serviceResponse = await getCityWeather(serviceParameters);

    expect(getCityWeather).toBeDefined();
    expect(typeof getCityWeather).toBe('function');
    expect(serviceResponse).toBeDefined();
    expect(serviceResponse).toEqual(mockRioCuarto);
  });

  it('should trow error if parameters are incorrect', async () => {
    // Mock axios
    const mockedAxios = mockAxios(mockRioCuarto);

    // Create getCityWeather service function
    const getCityWeather = getCityWeatherBuilder(mockedAxios);

    expect(getCityWeather).toBeDefined();
    expect(typeof getCityWeather).toBe('function');

    try {
      // Request weather info with bad parameters
      const serviceParameters = {
        cityName: '',
        countryCode: 'AR',
      };
      const serviceResponse = await getCityWeather(serviceParameters);

      expect(serviceResponse).toBeDefined();
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });
});
