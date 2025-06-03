using ComponentGallery.Server.Features.Components.GetComponentAssets;
using ComponentGallery.Server.Features.Components.GetComponentDetails;
using ComponentGallery.Server.Features.Components.GetComponentsList;
using ComponentGallery.Server.Features.Components.GetComponentTypeDetails;
using ComponentGallery.Server.Features.Components.GetPcBuildDetails;
using ComponentGallery.Server.Features.Components.GetPcBuildsAssets;
using ComponentGallery.Server.Features.Components.GetPcBuildsList;
using ComponentGallery.Server.Features.Components.UploadComponentAssets;

namespace ComponentGallery.Server.Features.Components;

public static class DependencyInjectionExtensions
{
    public static void MapComponentsEndpoints(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapGetComponentDetailsEndpoint();
        endpointRouteBuilder.MapGetComponentsListEndpoint();
        endpointRouteBuilder.MapGetComponentTypeDetailsEndpoint();
        endpointRouteBuilder.MapGetComponentTypeDetailsListEndpoint();
        endpointRouteBuilder.MapGetComponentAssetEndpoint();
        endpointRouteBuilder.MapUploadComponentAssetEndpoint();
        endpointRouteBuilder.MapGetPcBuildAssetAssetEndpoint();
        endpointRouteBuilder.MapGetPcBuildsListEndpoint();
        endpointRouteBuilder.MapPcBuildsDetailsEndpoint();
    }

    public static void AddComponentsServices(this IServiceCollection services)
    {
        services.AddTransient<GetComponentDetailsHandler>();
        services.AddTransient<GetComponentsListHandler>();
        services.AddTransient<GetComponentTypeDetailsHandler>();
        services.AddTransient<GetComponentTypeDetailsListHandler>();
        services.AddTransient<GetComponentAssetHandler>();
        services.AddTransient<UploadComponentAssetHandler>();
        services.AddTransient<GetPcBuildAssetHandler>();
        services.AddTransient<GetPcBuildsListHandler>();
        services.AddTransient<GetPcBuildDetailsHandler>();
    }
}
