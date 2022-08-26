# Weather sample API

Technical test

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

### `npm run test:watch`

Run all test in watch mode.

## Environment Variables

 You must create a `.env` file in the project root folder.

 You can also copy the `.env.example` file and complete it with your own values.
 
 These are the available environment variables:

```bash
# Fastify server port number
FASTIFY_PORT=2020

# Fastify addres to listen
FASTIFY_ADDRESS=0.0.0.0

# Cache ttl in seconds
CACHE_TTL_SECONDS=300

# Cache interval to clear expired records, in seconds
CACHE_CHECK_PERIOD_SECONDS=120

# OpenWheaterMap api key
OPENWEATHERMAP_APIKEY=

# OpenWheaterMap API Url
OPENWEATHERMAP_BASEURL=https://api.openweathermap.org/data/2.5/
```

## Project Structure

```
common\             
 |--configSchema.js       # Environment variables configuration schema
plugins\                  # Fastify plugins directory
routes\                   # Fastify routes directory
services\                 # Services for external data access
 |--openWeatherMap.js     # openWeatherMap api consumer  
tests\                    # Tests
 |--fixtures\             # Test fixtures
 |--mocks\                # Test mocks
 |--plugins\              # Plugins tests
 |--routes\               # Routes tests`
 |--services\             # Services tests
 |--utils\                # Test related utils
app.js                    # Fastify app
```

## API Documentation


**Wheather check**:\
`GET /weather/check` - get relevant weather information about an Argentinian city

### Mandatory Query Parameters
- **cityName** - City name to check
- **temperatureThreshold** - Temperature in celcius to check

### Response
- **temperatureCheck** - returns true if the actual city temperature is equal or great than the temperature Threshold.
- **cityWeather** - Relevant weather info onf the city
- **cityWeather.city** - Name of the city
- **cityWeather.description** - Current wheater short description
- **cityWeather.iconUrl** - URL for current wheater status icon
- **cityWeather.temp** - City actual temperature in celcius

#### Sample response
```json
{
    "temperatureCheck": true,
    "cityWeather": {
        "city": "Río Cuarto",
        "description": "broken clouds",
        "iconUrl": "https://openweathermap.org/img/wn/04n@2x.png",
        "temp": 15.82
    }
}
```
