using ComponentGallery.Server.Features.Components.GetComponentsList;
using ComponentGallery.Server.Features.Components.Models;
using Microsoft.AspNetCore.Mvc;

namespace ComponentGallery.Server.Features.Components.GetComponentTypeDetails
{
    internal record GetComponentTypeDetailsListResponse(List<ComponentTypeDetails> ComponentTypeDetails);

    internal static class GetComponentTypeDetailsListEndpoint
    {
        public static void MapGetComponentTypeDetailsListEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
        {
            endpointRouteBuilder.MapGet(
                "/api/componentTypes",
                async (
                    GetComponentTypeDetailsListHandler handler,
                    CancellationToken cancellationToken) =>
                {
                    var result = await handler.Handle(cancellationToken);
                    return Results.Ok(new GetComponentTypeDetailsListResponse(result));
                });
        }


    }
}
