using ComponentGallery.Server.Features.Components.Repositories;
using ComponentGallery.Server.Infrastructure.EntityFramework;
using ComponentGallery.Server.Infrastructure.EntityFramework.DatabaseSpecification;
using Microsoft.EntityFrameworkCore;

namespace ComponentGallery.Server.Infrastructure;

public static class DependencyInjectionExtensions
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddTransient<IComponentRepository, EntityFrameworkComponentRepository>();

        services.AddDbContext<GalleryMainDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString("SQL-Main"));
        });
    }
}
