using ComponentGallery.Server.Features.Components.Models;
using Microsoft.AspNetCore.Mvc;

namespace ComponentGallery.Server.Features.Components.GetComponentsList;

internal static class GetComponentsListEndpoint
{
    internal record GetComponentsListResponse(
        List<ComputerComponent> Components);

    public static void MapGetComponentsListEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapGet(
            "/api/components",
            async (
                [FromQuery] int pageIndex,
                GetComponentsListHandler handler,
                CancellationToken cancellationToken) =>
        {
            var result = await handler.Handle(pageIndex, cancellationToken);
            return Results.Ok(new GetComponentsListResponse(result));
        });
    }
}
