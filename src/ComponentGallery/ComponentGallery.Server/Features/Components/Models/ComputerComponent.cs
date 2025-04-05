namespace ComponentGallery.Server.Features.Components.Models;

public record ComputerComponent(
    int Id,
    string Name,
    string Description,
    int Type,
    decimal Price,
    Dictionary<string, string> Specification);
