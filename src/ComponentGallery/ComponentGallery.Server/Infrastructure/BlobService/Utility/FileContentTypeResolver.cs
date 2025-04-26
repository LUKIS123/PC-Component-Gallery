using ComponentGallery.Server.Infrastructure.BlobService.Exceptions;

namespace ComponentGallery.Server.Infrastructure.BlobService.Utility;

public interface IFileContentTypeResolver
{
    string ResolveContentType(string fileExtension);
}

public class FileContentTypeResolver : IFileContentTypeResolver
{
    public string ResolveContentType(string fileExtension)
    {
        return fileExtension switch
        {
            ".png" => "image/png",
            ".jpg" or ".jpeg" => "image/jpeg",
            ".bin" or ".glb" or ".exr" => "application/octet-stream",
            ".gltf" => "text/plain",
            _ => throw new UnsupportedResourceFormatException($"Unsupported image format:{fileExtension}")
        };
    }
}
