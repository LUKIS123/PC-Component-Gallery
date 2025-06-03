using ComponentGallery.Server.Infrastructure.BlobService.Models;

namespace ComponentGallery.Server.Features.Common.Repositories;

public interface IComponentAssetRepository
{
    Task UploadAssetAsync(SaveResourceDto saveResource);

    Task<DownloadedResourceDto> DownloadMainComponentAsset(
        string baseUri,
        ISet<string> mainFileExtensionSet,
        CancellationToken cancellationToken);

    Task<DownloadedResourceDto> DownloadAdditionalComponentAsset(
        string uri,
        CancellationToken cancellationToken);

    Task<DownloadedResourceDto> DownloadBackgroundAsset(
        string uri,
        CancellationToken cancellationToken);

    Task<DownloadedResourceDto> DownloadMainPcBuildAsset(
       string baseUri,
       ISet<string> mainFileExtensionSet,
       CancellationToken cancellationToken);

    Task<DownloadedResourceDto> DownloadAdditionalPcBuildAsset(
        string uri,
        CancellationToken cancellationToken);
}
