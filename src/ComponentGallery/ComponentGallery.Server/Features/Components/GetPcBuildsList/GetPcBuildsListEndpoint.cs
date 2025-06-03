using ComponentGallery.Server.Features.Components.Models;
using Microsoft.AspNetCore.Mvc;

namespace ComponentGallery.Server.Features.Components.GetPcBuildsList;

internal static class GetPcBuildsListEndpoint
{
    internal record GetPcBuildListResponse(
        List<PcBuild> PcBuilds);

    public static void MapGetPcBuildsListEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapGet(
            "/api/pcbuilds",
            async (
                [FromQuery] int pageIndex,
                GetPcBuildsListHandler handler,
                CancellationToken cancellationToken) =>
            {
                var result = await handler.Handle(pageIndex, cancellationToken);
                return Results.Ok(new GetPcBuildListResponse(result));
            });
    }
}
