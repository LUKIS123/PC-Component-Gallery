using ComponentGallery.Server.Infrastructure.BlobService.Models;

namespace ComponentGallery.Server.Features.Components.Repositories;

public interface IComponentAssetRepository
{
    Task UploadImageAsync(byte[] requestImage, string baseFilePath, string fileExtension);
    Task<DownloadedResourceDto> DownloadMainComponentAsset(string baseUri, ISet<string> mainFileExtensionSet,
        CancellationToken cancellationToken);
    Task<DownloadedResourceDto> DownloadAdditionalComponentAsset(string uri, CancellationToken cancellationToken);
    Task<DownloadedResourceDto> DownloadBackgroundAsset(string uri, CancellationToken cancellationToken);
}
