using Azure.Storage.Blobs;
using ComponentGallery.Server.Features.Components.Repositories;
using ComponentGallery.Server.Infrastructure.BlobService.Exceptions;
using ComponentGallery.Server.Infrastructure.BlobService.Models;
using ComponentGallery.Server.Infrastructure.BlobService.Utility;
using Microsoft.Extensions.Options;

namespace ComponentGallery.Server.Infrastructure.BlobService;

public class StorageAccountBlobRepository(
    BlobServiceClient blobServiceClient,
    IOptions<BlobServiceOptions> options,
    IFileContentTypeResolver fileContentTypeResolver) : IComponentAssetRepository
{
    private readonly BlobServiceOptions _blobServiceOptions = options.Value;

    public Task UploadImageAsync(byte[] requestImage, string baseFilePath, string fileExtension)
    {
        throw new NotImplementedException();
    }

    public async Task<DownloadedResourceDto> DownloadMainComponentAsset(string baseUri, ISet<string> mainFileExtensionSet, CancellationToken cancellationToken)
    {
        var blobClient = await GetBlobClientForExtensionAsync(baseUri, mainFileExtensionSet, BlobClientType.Component, cancellationToken);
        return await DownloadBlobContentAsync(blobClient, cancellationToken);
    }

    public async Task<DownloadedResourceDto> DownloadAdditionalComponentAsset(string uri, CancellationToken cancellationToken)
    {
        var blobClient = await GetBlobClient(uri, BlobClientType.Component, cancellationToken);
        return await DownloadBlobContentAsync(blobClient, cancellationToken);
    }

    public async Task<DownloadedResourceDto> DownloadBackgroundAsset(string uri, CancellationToken cancellationToken)
    {
        var blobClient = await GetBlobClient(uri, BlobClientType.Background, cancellationToken);
        return await DownloadBlobContentAsync(blobClient, cancellationToken);
    }

    private async Task<BlobClient> GetBlobClient(string uri, BlobClientType type, CancellationToken cancellationToken)
    {
        var blobContainerClient = GetBlobContainerClient(type);

        await foreach (var blobItem in blobContainerClient.GetBlobsAsync(prefix: uri, cancellationToken: cancellationToken))
        {
            return blobContainerClient.GetBlobClient(blobItem.Name);
        }

        throw new ContentNotFoundException($"Resource:{uri} does not exist");
    }

    private async Task<BlobClient> GetBlobClientForExtensionAsync(string baseUri, ISet<string> mainFileExtensionSet, BlobClientType type, CancellationToken cancellationToken)
    {
        var blobContainerClient = GetBlobContainerClient(type);

        await foreach (var blobItem in blobContainerClient.GetBlobsAsync(prefix: baseUri, cancellationToken: cancellationToken))
        {
            var extension = Path.GetExtension(blobItem.Name);
            if (mainFileExtensionSet.Contains(extension.ToLowerInvariant()))
            {
                return blobContainerClient.GetBlobClient(blobItem.Name);
            }
        }

        throw new ContentNotFoundException($"Resource:{baseUri} does not exist");
    }

    private BlobContainerClient GetBlobContainerClient(BlobClientType type)
    {
        return type == BlobClientType.Component
            ? blobServiceClient.GetBlobContainerClient(_blobServiceOptions.ComponentContainerName)
            : blobServiceClient.GetBlobContainerClient(_blobServiceOptions.BackgroundContainerName);
    }

    private static async Task<DownloadedResourceDto> DownloadBlobContentAsync(BlobClient blobClient, CancellationToken cancellationToken)
    {
        var content = await blobClient.DownloadContentAsync(cancellationToken);
        if (!content.HasValue)
        {
            throw new ContentNotFoundException($"Resource:{blobClient.Name} not found");
        }

        return new DownloadedResourceDto(
            content.Value.Content.ToArray(),
            blobClient.Name,
            content.Value.Details.ContentType);
    }
}


// blob/
// └── components/
//     └── {componentId}/
//         ├── model.gltf
//         ├── model.bin          ← opcjonalny binarny bufor
//         ├── texture1.jpg       ← tekstury
//         ├── texture2.png
//         └── other-resources/   ← opcjonalny folder na dodatkowe rzeczy

// Łatwe do odczytu: wystarczy pobrać cały folder components/{componentId}/{componentName.gltf}
// albo components/componentId/costam.glft -> przeiteruje po elementach i zwroci glft
// potem reszta components/componentId/nazwaWlasciwa.jpg
// UWAGA: jeszcze moze byc .glb plik


// uiri: /costam/id/model.gltf lub /costam/id/model.glb --- jesli rozpozna koncowke gltf lub glb to zwraca niezaleznie od nazwy pliku, szuka 1 apotkane
// pozostale rozszerzenia musza byc nazwa densitive.!!!!1
// 
// backgroundy to osobna sciezka. /costam/backrounds/id/siema.exr