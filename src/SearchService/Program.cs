using System.Net;
using MassTransit;
using MongoDB.Driver;
using Polly;
using Polly.Extensions.Http;
using Serilog;
using SearchService.Consumers;
using SearchService.Data;
using SearchService.RequestHelpers;
using SearchService.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//Serilog
builder.Host.UseSerilog((context, configuration) =>
configuration.ReadFrom.Configuration(context.Configuration)
);

builder.Services.AddControllers();
builder.Services.AddHttpClient<AuctionServiceHttpClient>().AddPolicyHandler(GetPolicy());
builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile(new MappingProfile());
});

builder.Services.AddMassTransit(x =>
{
    // ✅ Registers ALL consumers in SearchService automatically
    x.AddConsumers(typeof(Program).Assembly);

    x.SetEndpointNameFormatter(
        new KebabCaseEndpointNameFormatter("search", false)
    );

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.Configuration["RabbitMq:Host"], "/", h =>
        {
            h.Username(builder.Configuration.GetValue("RabbitMq:Username", "guest"));
            h.Password(builder.Configuration.GetValue("RabbitMq:Password", "guest"));
        });

        // ✅ Wires ALL consumers to queues
        cfg.ConfigureEndpoints(context);
    });
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();
app.UseSerilogRequestLogging();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.Lifetime.ApplicationStarted.Register(async () =>
{
    // mongoDB settings
    try
    {
        await DbInitializer.InitDb(app);
    }
    catch (Exception e)
    {
        Console.WriteLine(e);
    }
});

app.Run();

static IAsyncPolicy<HttpResponseMessage> GetPolicy()
     => HttpPolicyExtensions
       .HandleTransientHttpError()
       .OrResult(msg => msg.StatusCode == HttpStatusCode.NotFound)
       .WaitAndRetryForeverAsync(_ => TimeSpan.FromSeconds(3));
