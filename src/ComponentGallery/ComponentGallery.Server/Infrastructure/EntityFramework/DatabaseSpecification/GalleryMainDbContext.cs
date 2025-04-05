using Microsoft.EntityFrameworkCore;

namespace ComponentGallery.Server.Infrastructure.EntityFramework.DatabaseSpecification;

public class GalleryMainDbContext(DbContextOptions<GalleryMainDbContext> options) : DbContext(options)
{
    public DbSet<ComponentEntity> Components { get; set; }
    public DbSet<SpecificationEntity> Specifications { get; set; }
}
