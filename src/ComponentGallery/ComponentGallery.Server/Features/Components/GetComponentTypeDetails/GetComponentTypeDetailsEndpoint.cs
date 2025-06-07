using Microsoft.AspNetCore.Mvc;

namespace ComponentGallery.Server.Features.Components.GetComponentTypeDetails
{
    internal static class GetComponentTypeDetailsEndpoint
    {
        public static void MapGetComponentTypeDetailsEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
        {
            endpointRouteBuilder.MapGet(
                "/api/componentType/{typeId}",
                async (
                    [FromRoute] int typeId,
                    GetComponentTypeDetailsHandler handler,
                    CancellationToken cancellationToken) =>
                {
                    var result = await handler.Handle(typeId, cancellationToken);
                    return Results.Ok(result);
                });
        }
    }
}
