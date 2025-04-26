using Microsoft.AspNetCore.Mvc;

namespace ComponentGallery.Server.Features.Backgrounds.GetBackgroundAssets;

internal static class GetBackgroundAssetEndpoint
{
    public static void MapGetBackgroundAssetEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapGet(
            "/api/assents/backgrounds/{backgroundId}",
            async (
                [FromRoute] int backgroundId,
                [FromServices] GetBackgroundAssetHandler handler,
                CancellationToken cancellationToken) =>
            {
                var result = await handler.Handle(backgroundId, cancellationToken);
                return Results.File(result.FileBytes, result.ContentType, result.FileName);
            });
    }
}
