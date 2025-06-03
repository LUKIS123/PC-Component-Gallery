using System.ComponentModel;

namespace ComponentGallery.Server.Features.Components.Models;

public record PcBuild(
    int Id,
    string Name,
    string Description,
    decimal Price,
    Dictionary<string, ComputerComponent> Swaps);