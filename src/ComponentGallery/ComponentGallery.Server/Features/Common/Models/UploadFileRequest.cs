namespace ComponentGallery.Server.Features.Common.Models;

public record UploadFileRequest
{
    public required IFormFile File { get; set; }
}
