using ComponentGallery.Server.Features.Components.GetComponentDetails;
using ComponentGallery.Server.Features.Components.GetComponentsList;
using ComponentGallery.Server.Features.Components.GetComponentTypeDetails;

namespace ComponentGallery.Server.Features.Components;

public static class DependencyInjectionExtensions
{
    public static void MapComponentsEndpoints(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapGetComponentDetailsEndpoint();
        endpointRouteBuilder.MapGetComponentsListEndpoint();
        endpointRouteBuilder.MapGetComponentTypeDetailsEndpoint();
        endpointRouteBuilder.MapGetComponentTypeDetailsListEndpoint();
    }

    public static void AddComponentsServices(this IServiceCollection services)
    {
        services.AddTransient<GetComponentDetailsHandler>();
        services.AddTransient<GetComponentsListHandler>();
        services.AddTransient<GetComponentTypeDetailsHandler>();
        services.AddTransient<GetComponentTypeDetailsListHandler>();
    }
}
