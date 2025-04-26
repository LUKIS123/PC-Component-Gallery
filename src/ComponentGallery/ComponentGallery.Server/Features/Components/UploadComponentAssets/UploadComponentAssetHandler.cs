using ComponentGallery.Server.Features.Common.Repositories;
using ComponentGallery.Server.Infrastructure.BlobService.Models;

namespace ComponentGallery.Server.Features.Components.UploadComponentAssets;

public class UploadComponentAssetHandler(IComponentAssetRepository assetRepository)
{
    public async Task Handle(int id, byte[] file, string fileName, string fileExtension, CancellationToken cancellationToken)
    {
        var uri = $"components/{id}/{fileName}{fileExtension.ToLower()}";
        var saveRequestDto = new SaveResourceDto(
            FileBytes: file,
            ResourcePath: uri,
            FileExtension: fileExtension.ToLower(),
            ResourceType: ResourceType.Component,
            CancellationToken: cancellationToken);
        await assetRepository.UploadAssetAsync(saveRequestDto);
    }
}
