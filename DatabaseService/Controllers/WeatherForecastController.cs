using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DatabaseService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        public WeatherService Client { get; }

        public WeatherForecastController(ILogger<WeatherForecastController> logger, WeatherService client)
        {
            _logger = logger;
            Client = client;
        }


        [HttpGet]
        [Route("{city}")]
        public async Task<WeatherForecast> Get(string city)
        {

            var forecast = await Client.GeCurrenttWeatherAsync(city);
            return new WeatherForecast {
                Summary = forecast.weather[0].description,
                TemperatureC = (int) forecast.main.temp,
                Date = DateTimeOffset.FromUnixTimeMilliseconds(forecast.dt).DateTime
            };
        }
    }
}
