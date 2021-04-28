# Database service to access mongodb

## Docker command line to run this service in a container
I am using Docker for windows hence the additional env variables (MONGODBSETTINGS__HOST, and environment) in Dockerfile. MONGODBSETTINGS__HOST tells the container where mongodb is runing.
The --net=host tells docker to run the container on the same local network as your pc where your local mongodb is running.
```
run --rm -p 8080:80 dbservice:v1 --net=host
```

## Automatically open browser at the swagger url
Add the uriFormat property as shown below to the vscode launch.json file,
```
            "serverReadyAction": {
                "action": "openExternally",
                "pattern": "\\bNow listening on:\\s+(https?://\\S+)",
                "uriFormat": "%s/swagger"
            },
```
### Note!!!
For some reason my vscode added extra "\\" to each "\\" on the 'pattern' which stopped vscode from launching at all as the pattern was not found in the debug console.

[Ref](https://github.com/OmniSharp/omnisharp-vscode/blob/master/debugger-launchjson.md#starting-a-web-browser)

## Disable opening of browser
Remove above block if you don't want to open a browser, when working with apis for example.

# Network call retries
Add package Polly
```
dotnet add package Microsoft.Extensions.Http.Polly
```
In startup.cs,
```
public void ConfigureServices(IServiceCollection services)
{
...
    services.AddHttpClient<WeatherService>()
        .AddTransientHttpErrorPolicy(builder => builder.WaitAndRetryAsync(10, retryAttemp => TimeSpan.FromSeconds(Math.Pow(2, retryAttemp))))
        .AddTransientHttpErrorPolicy(builder => builder.CircuitBreakerAsync(3, TimeSpan.FromSeconds(15)));

}
```
# Add health check endpoint
In ConfigureServices add,
```
services.AddHealthChecks();
```
in Configure add,
```
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHealthChecks("/health");
            });
```
The path is arbitrary, "/health", in this case.

# Add json logging
Add logging.AddJsonConsole() to CreateHostBuilder method,

```
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureLogging((context, logging) =>
                {
                    logging.AddJsonConsole();
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
```
or only use json logging for production with,
```
                .ConfigureLogging((context, logging) =>
                {
                    if (context.HostingEnvironment.IsProduction()) {
                        logging.ClearProviders();
                        logging.AddJsonConsole();
                    }
                })
```