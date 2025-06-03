using ComponentGallery.Server.Features.Common.Models;
using ComponentGallery.Server.Features.Common.Repositories;

namespace ComponentGallery.Server.Features.Components.GetPcBuildsAssets;

internal class GetPcBuildAssetHandler(IComponentAssetRepository assetRepository)
{
    private static readonly HashSet<string> MainFileExtensionSet =
    [
        ".gltf", ".glb"
    ];

    public async Task<Asset> Handle(int id, string file, CancellationToken cancellationToken)
    {
        var fileExtension = Path.GetExtension(file);
        var fileName = Path.GetFileNameWithoutExtension(file);

        if (fileExtension is "" or null)
        {
            var mainFileBaseUri = $"prebuiltPcs/{id}";
            var mainFileResource =
                await assetRepository.DownloadMainPcBuildAsset(mainFileBaseUri, MainFileExtensionSet,
                    cancellationToken);
            return new Asset(
                mainFileResource.ImageBytes,
                Path.GetFileName(mainFileResource.BlobName),
                mainFileResource.ContentType);
        }

        var uri = $"prebuiltPcs/{id}/{fileName}{fileExtension}";
        var resource = await assetRepository.DownloadAdditionalPcBuildAsset(uri, cancellationToken);
        return new Asset(
            resource.ImageBytes,
            Path.GetFileName(resource.BlobName),
            resource.ContentType);
    }
}