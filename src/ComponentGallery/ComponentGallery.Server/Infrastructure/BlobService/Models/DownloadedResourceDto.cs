namespace ComponentGallery.Server.Infrastructure.BlobService.Models;

public record DownloadedResourceDto(
    byte[] ImageBytes,
    string BlobName,
    string ContentType
);

