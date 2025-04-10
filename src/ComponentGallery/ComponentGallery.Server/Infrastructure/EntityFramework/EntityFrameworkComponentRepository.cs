﻿using ComponentGallery.Server.Features.Components.Models;
using ComponentGallery.Server.Features.Components.Repositories;
using ComponentGallery.Server.Infrastructure.EntityFramework.DatabaseSpecification;
using Microsoft.EntityFrameworkCore;

namespace ComponentGallery.Server.Infrastructure.EntityFramework;

public class EntityFrameworkComponentRepository(GalleryMainDbContext dbContext) : IComponentRepository
{
    public async Task<ComputerComponent?> GetComponentByIdAsync(int id, CancellationToken cancellationToken)
    {
        var entity = await dbContext.Components
            .AsNoTracking()
            .Include(c => c.Specifications)
            .SingleOrDefaultAsync(c => c.Id == id, cancellationToken);

        return entity is not null
            ? MapToComputerComponent(entity)
            : null;
    }

    public async Task<List<ComputerComponent>> GetComponentsListAsync(int pageIndex, int pageSize, CancellationToken cancellationToken)
    {
        var result = await dbContext.Components
            .AsNoTracking()
            .Include(c => c.Specifications)
            .Skip(pageIndex * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return result
            .Select(MapToComputerComponent)
            .ToList();
    }

    private static ComputerComponent MapToComputerComponent(ComponentEntity component)
    {
        return new(
            component.Id,
            component.Name,
            component.Description,
            component.Type,
            component.Price,
            component.Specifications.ToDictionary(x => x.Key, x => x.Value));
    }
}
