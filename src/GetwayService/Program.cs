using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddReverseProxy().LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.Authority = builder.Configuration["IdentityServiceUrl"];
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters.ValidateAudience = false;
    options.TokenValidationParameters.NameClaimType = "username";
});

var clientApp = builder.Configuration.GetValue<string>("ClientApp")
               ?? throw new InvalidOperationException("ClientApp is not configured");

builder.Services.AddCors(options =>
{
    options.AddPolicy("customPolicy", b =>
    {
        b.WithOrigins(clientApp)
         .AllowAnyHeader()
         .AllowAnyMethod()
         .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors();

app.MapReverseProxy();
app.UseAuthentication();
app.UseAuthorization();

app.Run();
