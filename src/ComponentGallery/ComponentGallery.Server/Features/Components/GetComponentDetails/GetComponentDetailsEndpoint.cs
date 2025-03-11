using Microsoft.AspNetCore.Mvc;

namespace ComponentGallery.Server.Features.Components.GetComponentDetails;

internal static class GetComponentDetailsEndpoint
{
    public static void MapGetComponentDetailsEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapGet(
            "/api/components/{id}",
            async (
                [FromRoute] int id,
                GetComponentDetailsHandler handler,
                CancellationToken cancellationToken) =>
        {
            var result = await handler.Handle(id, cancellationToken);

            return result is not null
                ? Results.Ok(result)
                : Results.NotFound();
        });
    }
}
