using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using ComponentGallery.Server.Features.Common.Repositories;
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

    public async Task UploadAssetAsync(SaveResourceDto saveResource)
    {
        var containerClient = GetBlobContainerClient(saveResource.ResourceType);

        var blobClient = containerClient.GetBlobClient(saveResource.ResourcePath);
        await blobClient.UploadAsync(
            content: BinaryData.FromBytes(saveResource.FileBytes),
            options: new BlobUploadOptions
            {
                HttpHeaders = new BlobHttpHeaders
                {
                    ContentType = fileContentTypeResolver.ResolveContentType(saveResource.FileExtension)
                },
                Conditions = null // Overwrite if exists
            },
            cancellationToken: saveResource.CancellationToken);
    }

    public async Task<DownloadedResourceDto> DownloadMainComponentAsset(
        string baseUri,
        ISet<string> mainFileExtensionSet,
        CancellationToken cancellationToken)
    {
        var blobClient = await GetBlobClientForExtensionAsync(
            baseUri,
            mainFileExtensionSet,
            ResourceType.Component,
            cancellationToken);
        return await DownloadBlobContentAsync(blobClient, cancellationToken);
    }

    public async Task<DownloadedResourceDto> DownloadAdditionalComponentAsset(
        string uri,
        CancellationToken cancellationToken)
    {
        var blobClient = await GetBlobClient(uri, ResourceType.Component, cancellationToken);
        return await DownloadBlobContentAsync(blobClient, cancellationToken);
    }

    public async Task<DownloadedResourceDto> DownloadBackgroundAsset(
        string uri,
        CancellationToken cancellationToken)
    {
        var blobClient = await GetBlobClient(uri, ResourceType.Background, cancellationToken);
        return await DownloadBlobContentAsync(blobClient, cancellationToken);
    }

    private async Task<BlobClient> GetBlobClient(
        string uri,
        ResourceType type,
        CancellationToken cancellationToken)
    {
        var blobContainerClient = GetBlobContainerClient(type);

        await foreach (var blobItem in blobContainerClient.GetBlobsAsync(prefix: uri, cancellationToken: cancellationToken))
        {
            return blobContainerClient.GetBlobClient(blobItem.Name);
        }

        throw new ContentNotFoundException($"Resource:{uri} does not exist");
    }

    private async Task<BlobClient> GetBlobClientForExtensionAsync(
        string baseUri,
        ISet<string> mainFileExtensionSet,
        ResourceType type,
        CancellationToken cancellationToken)
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

    private BlobContainerClient GetBlobContainerClient(ResourceType type)
    {
        return type == ResourceType.Component
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
