namespace ComponentGallery.Server.Features.Components.Models;

public record ComputerComponent(
    int Id,
    string Name,
    Dictionary<string, string> Specification);
