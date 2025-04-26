using ComponentGallery.Server.Features.Backgrounds;
using ComponentGallery.Server.Features.Components;
using ComponentGallery.Server.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();
builder.Services.AddComponentsServices();
builder.Services.AddBackgroundsServices();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

app.UseInfrastructure();

app.UseDefaultFiles();
app.MapStaticAssets();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.MapComponentsEndpoints();
app.MapBackgroundsEndpoints();

app.MapFallbackToFile("/index.html");

app.Run();