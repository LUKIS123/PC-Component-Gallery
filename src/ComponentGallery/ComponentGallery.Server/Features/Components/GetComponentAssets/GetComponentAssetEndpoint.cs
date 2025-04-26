using Microsoft.AspNetCore.Mvc;

namespace ComponentGallery.Server.Features.Components.GetComponentAssets;

internal static class GetComponentAssetEndpoint
{
    public static void MapGetComponentAssetEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapGet(
            "/api/assents/components/{componentId}/{file}",
            async (
                [FromRoute] int componentId,
                [FromRoute] string file,
                [FromServices] GetComponentAssetHandler handler,
                CancellationToken cancellationToken) =>
            {
                var result = await handler.Handle(componentId, file, cancellationToken);
                return Results.File(result.FileBytes, result.ContentType, result.FileName);
            });
    }
}
