using System.Net.NetworkInformation;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Options;

namespace DatabaseService
{
    public class ExternalEndpointHealthCheck : IHealthCheck
    {
        private WeatherSettings settings { get; set; }


        public ExternalEndpointHealthCheck(IOptions<WeatherSettings> options)
        {
            settings = options.Value;
        }
        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            try
            {
                Ping ping = new Ping();
                var reply = await ping.SendPingAsync(settings.Url);
                if (reply.Status != IPStatus.Success)
                {
                    return HealthCheckResult.Unhealthy();
                }
                return HealthCheckResult.Healthy();
            }
            catch (PingException)
            {
                return HealthCheckResult.Unhealthy();
            }

        }
    }
}