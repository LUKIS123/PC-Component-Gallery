﻿using ComponentGallery.Server.Features.Components.GetComponentDetails;
using ComponentGallery.Server.Features.Components.GetComponentsList;

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
    }
}
