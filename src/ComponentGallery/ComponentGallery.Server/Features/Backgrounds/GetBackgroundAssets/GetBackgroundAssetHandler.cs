using ComponentGallery.Server.Features.Common.Models;
using ComponentGallery.Server.Features.Common.Repositories;

namespace ComponentGallery.Server.Features.Backgrounds.GetBackgroundAssets;

public class GetBackgroundAssetHandler(IComponentAssetRepository assetRepository)
{
    public async Task<Asset> Handle(
        int backgroundId,
        CancellationToken cancellationToken)
    {
        var uri = $"environments/{backgroundId}/";
        var resource = await assetRepository.DownloadBackgroundAsset(uri, cancellationToken);
        return new Asset(
            resource.ImageBytes,
            Path.GetFileName(resource.BlobName),
            resource.ContentType);
    }
}
