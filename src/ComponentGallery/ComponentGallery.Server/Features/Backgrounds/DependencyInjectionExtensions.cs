using ComponentGallery.Server.Features.Backgrounds.GetBackgroundAssets;

namespace ComponentGallery.Server.Features.Backgrounds;

public static class DependencyInjectionExtensions
{
    public static void MapBackgroundsEndpoints(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapGetBackgroundAssetEndpoint();
    }

    public static void AddBackgroundsServices(this IServiceCollection services)
    {
        services.AddTransient<GetBackgroundAssetHandler>();
    }
}
