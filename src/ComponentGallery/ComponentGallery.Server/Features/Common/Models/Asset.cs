namespace ComponentGallery.Server.Features.Common.Models;

public record Asset(
    byte[] FileBytes,
    string FileName,
    string ContentType
);
