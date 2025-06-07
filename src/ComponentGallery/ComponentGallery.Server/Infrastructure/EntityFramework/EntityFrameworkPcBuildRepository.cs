using ComponentGallery.Server.Features.Components.Models;
using ComponentGallery.Server.Features.Components.Repositories;
using ComponentGallery.Server.Infrastructure.EntityFramework.DatabaseSpecification;
using Microsoft.EntityFrameworkCore;

namespace ComponentGallery.Server.Infrastructure.EntityFramework;

public class EntityFrameworkPcBuildRepository(GalleryMainDbContext dbContext) : IPcBuildsRepository
{
    public async Task<List<PcBuild>> GetPcBuildListAsync(int pageIndex, int pageSize,
        CancellationToken cancellationToken)
    {
        var result = await dbContext.PcBuilds
            .OrderBy(b => b.Id)
            .AsNoTracking()
            .Include(c => c.Swaps)
            .Skip(pageIndex * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return result
            .Select(MapToPcBuild)
            .ToList();
    }

    public async Task<PcBuild?> GetPcBuildByIdAsync(int id, CancellationToken cancellationToken)
    {
        var entity = await dbContext.PcBuilds
            .AsNoTracking()
            .Include(c => c.Swaps)
            .SingleOrDefaultAsync(c => c.Id == id, cancellationToken);

        return entity is not null
            ? MapToPcBuild(entity)
            : null;
    }

    private static PcBuild MapToPcBuild(PcBuildEntity buildEntity)
    {
        return new PcBuild(
            buildEntity.Id,
            buildEntity.Name,
            buildEntity.Description,
            buildEntity.Price,
            buildEntity.Swaps.ToDictionary(
                x => x.Type.ToString(),
                x => MapToComputerComponent(x.Component)));
    }

    private static ComputerComponent MapToComputerComponent(ComponentEntity component)
    {
        return new ComputerComponent(
            component.Id,
            component.Name,
            component.Description,
            component.Type,
            component.Price,
            component.ImageUrl,
            component.Specifications.ToDictionary(x => x.Key, x => x.Value));
    }
}