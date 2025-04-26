namespace ComponentGallery.Server.Infrastructure.BlobService.Models;

public record SaveResourceDto(
    byte[] FileBytes,
    string ResourcePath,
    string FileExtension,
    ResourceType ResourceType,
    CancellationToken CancellationToken
);
