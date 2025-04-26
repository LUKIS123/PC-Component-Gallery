using ComponentGallery.Server.Features.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace ComponentGallery.Server.Features.Components.UploadComponentAssets;

public static class UploadComponentAssetEndpoint
{
    public static void MapUploadComponentAssetEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapPost(
            "/api/assents/components/{componentId}",
            async (
                [FromRoute] int componentId,
                [FromForm] UploadFileRequest request,
                [FromServices] UploadComponentAssetHandler handler,
                CancellationToken cancellationToken) =>
            {
                if (request.File.Length == 0)
                {
                    return Results.BadRequest("File is empty.");
                }

                using var memoryStream = new MemoryStream();
                await request.File.CopyToAsync(memoryStream, cancellationToken);

                await handler.Handle(
                    componentId,
                    memoryStream.ToArray(),
                    Path.GetFileNameWithoutExtension(request.File.FileName),
                    Path.GetExtension(request.File.FileName),
                    cancellationToken);

                return Results.Created();
            })
            .Accepts<UploadFileRequest>("multipart/form-data")
            .DisableAntiforgery();
    }
}
