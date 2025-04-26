namespace ComponentGallery.Server.Infrastructure.BlobService.Exceptions;

public class ContentNotFoundException : Exception
{
    public ContentNotFoundException()
    {
    }

    public ContentNotFoundException(string? message) : base(message)
    {
    }
}
