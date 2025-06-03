using ComponentGallery.Server.Infrastructure.BlobService.Models;
using Microsoft.EntityFrameworkCore;

namespace ComponentGallery.Server.Infrastructure.EntityFramework.DatabaseSpecification;

public class GalleryMainDbContext(DbContextOptions<GalleryMainDbContext> options) : DbContext(options)
{
    public DbSet<ComponentEntity> Components { get; set; }
    public DbSet<SpecificationEntity> Specifications { get; set; }
    public DbSet<ComponentTypeEntity> ComponentTypes { get; set; }
    public DbSet<PcBuildEntity> PcBuilds { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);


        modelBuilder.Entity<PcBuildEntity>(entity =>
        {
            entity.ToTable("PcBuilds", "Gallery");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
            entity.HasMany(e => e.Swaps)
                .WithOne(e => e.PcBuild)
                .HasForeignKey(e => e.PcBuildId);
        });

        modelBuilder.Entity<PcBuildComponentSwapEntity>(entity =>
        {
            entity.ToTable("PcBuildSwaps", "Gallery");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasDefaultValueSql("NEWID()");
            entity.Property(e => e.Type).IsRequired();
            entity.Property(e => e.ComponentId).IsRequired();
            entity.HasOne(e => e.Component)
                .WithMany()
                .HasForeignKey(e => e.ComponentId);
            entity.Property(e => e.Type)
                .HasConversion(
                    v => (int)v,
                    v => (PcAssemblySwappablePartType)v);
        });
    }
}