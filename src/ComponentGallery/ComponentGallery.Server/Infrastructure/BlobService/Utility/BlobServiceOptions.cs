namespace ComponentGallery.Server.Infrastructure.BlobService.Utility;

public class BlobServiceOptions
{
    public required string ComponentContainerName { get; init; }
    public required string BackgroundContainerName { get; init; }
}
