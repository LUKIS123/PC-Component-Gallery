using ComponentGallery.Server.Features.Components;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();
builder.Services.AddComponentsServices();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.MapComponentsEndpoints();

app.MapFallbackToFile("/index.html");

app.Run();