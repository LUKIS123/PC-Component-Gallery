namespace ComponentGallery.Server.Features.Components.Models;

public record Asset(
    byte[] Image,
    string FileName,
    string ContentType
);
