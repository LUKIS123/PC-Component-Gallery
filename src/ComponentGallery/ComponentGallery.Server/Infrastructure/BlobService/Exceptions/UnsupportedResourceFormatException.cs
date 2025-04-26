namespace ComponentGallery.Server.Infrastructure.BlobService.Exceptions;

public class UnsupportedResourceFormatException : Exception
{
    public UnsupportedResourceFormatException()
    {
    }

    public UnsupportedResourceFormatException(string? message) : base(message)
    {
    }
}
