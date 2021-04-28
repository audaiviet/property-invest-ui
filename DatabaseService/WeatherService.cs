using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

namespace DatabaseService
{
    public class WeatherService
    {
        public WeatherService(HttpClient client, IOptions<WeatherSettings> settings)
        {
            Client = client;
            Settings = settings.Value;
        }

        // records to extract json result
        public record Weather(string description);
        public record Main(decimal temp);
        public record Forecast(Weather[] weather, Main main, long dt);

        public async Task<Forecast> GeCurrenttWeatherAsync(string city)
        {
            var forecast = await Client.GetFromJsonAsync<Forecast>($"https://{Settings.Url}/data/2.5/weather?q={city}&appid={Settings.ApiKey}&units=metric");
            return forecast;
        }
        public HttpClient Client { get; }
        public WeatherSettings Settings { get; }
    }
}