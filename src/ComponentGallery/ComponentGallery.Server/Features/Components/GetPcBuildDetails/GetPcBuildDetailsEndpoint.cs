using Microsoft.AspNetCore.Mvc;

namespace ComponentGallery.Server.Features.Components.GetPcBuildDetails;

internal static class GetPcBuildDetailsEndpoint
{
    public static void MapPcBuildsDetailsEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapGet(
            "/api/pcbuilds/{id}",
            async (
                [FromRoute] int id,
                GetPcBuildDetailsHandler handler,
                CancellationToken cancellationToken) =>
            {
                var result = await handler.Handle(id, cancellationToken);

                return result is not null
                    ? Results.Ok(result)
                    : Results.NotFound();
            });
    }
}
