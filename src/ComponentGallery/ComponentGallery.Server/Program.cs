using ComponentGallery.Server.Features.Components;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddComponentsServices();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

app.MapOpenApi();

app.UseHttpsRedirection();

app.MapComponentsEndpoints();

app.MapFallbackToFile("/index.html");

app.Run();