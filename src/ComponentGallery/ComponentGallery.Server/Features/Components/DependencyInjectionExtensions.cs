using ComponentGallery.Server.Features.Components.GetComponentDetails;
using ComponentGallery.Server.Features.Components.GetComponentsList;
using ComponentGallery.Server.Features.Components.Repositories;

namespace ComponentGallery.Server.Features.Components;

public static class DependencyInjectionExtensions
{
    public static void MapComponentsEndpoints(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapGetComponentDetailsEndpoint();
        endpointRouteBuilder.MapGetComponentsListEndpoint();
    }

    public static void AddComponentsServices(this IServiceCollection services)
    {
        services.AddTransient<GetComponentDetailsHandler>();
        services.AddTransient<GetComponentsListHandler>();

        services.AddTransient<IComponentRepository, InMemoryComponentRepository>();
    }
}
