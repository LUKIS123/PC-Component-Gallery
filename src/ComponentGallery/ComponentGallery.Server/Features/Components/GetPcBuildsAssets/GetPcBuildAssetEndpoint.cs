using Microsoft.AspNetCore.Mvc;

namespace ComponentGallery.Server.Features.Components.GetPcBuildsAssets;

internal static class GetPcBuildAssetEndpoint
{
    public static void MapGetPcBuildAssetAssetEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapGet(
            "/api/assents/pcbuilds/{buildId}/{file}",
            async (
                [FromRoute] int buildId,
                [FromRoute] string file,
                [FromServices] GetPcBuildAssetHandler handler,
                CancellationToken cancellationToken) =>
            {
                var result = await handler.Handle(buildId, file, cancellationToken);
                return Results.File(result.FileBytes, result.ContentType, result.FileName);
            });
    }
}
