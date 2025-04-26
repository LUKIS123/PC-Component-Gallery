using ComponentGallery.Server.Features.Components.Repositories;
using ComponentGallery.Server.Infrastructure.BlobService;
using ComponentGallery.Server.Infrastructure.BlobService.Middleware;
using ComponentGallery.Server.Infrastructure.BlobService.Utility;
using ComponentGallery.Server.Infrastructure.EntityFramework;
using ComponentGallery.Server.Infrastructure.EntityFramework.DatabaseSpecification;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Azure;

namespace ComponentGallery.Server.Infrastructure;

public static class DependencyInjectionExtensions
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        // EF
        services.AddTransient<IComponentRepository, EntityFrameworkComponentRepository>();

        services.AddDbContext<GalleryMainDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString("SQL-Main"));
        });

        // Azure Blob Service
        services.AddAzureClients(clientBuilder =>
        {
            clientBuilder.AddBlobServiceClient(configuration.GetConnectionString("StorageAccount"));
        });
        services.Configure<BlobServiceOptions>(
            configuration.GetSection("BlobService"));

        services.AddTransient<BlobServiceExceptionHandlingMiddleware>();
        services.AddTransient<IComponentAssetRepository, StorageAccountBlobRepository>();
        services.AddTransient<IFileContentTypeResolver, FileContentTypeResolver>();
    }

    public static void UseInfrastructure(this IApplicationBuilder app)
    {
        app.UseMiddleware<BlobServiceExceptionHandlingMiddleware>();
    }
}
