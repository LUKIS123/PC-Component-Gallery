using ComponentGallery.Server.Features.Components.Models;

namespace ComponentGallery.Server.Features.Components.Repositories;

internal class InMemoryComponentRepository : IComponentRepository
{
    private static readonly IReadOnlyList<ComputerComponent> _components =
    [
        new(1, "CPU", []),
        new(2, "GPU", []),
        new(3, "RAM", []),
        new(4, "Motherboard", []),
        new(5, "Storage", []),
        new(6, "Power Supply", []),
        new(7, "Case", [])
    ];

    public Task<ComputerComponent?> GetComponentByIdAsync(int id, CancellationToken cancellationToken)
    {
        var component = _components
            .SingleOrDefault(c => c.Id == id);

        return Task.FromResult(component);
    }

    public Task<List<ComputerComponent>> GetComponentsListAsync(int pageIndex, int pageSize, CancellationToken cancellationToken)
    {
        return Task.FromResult(_components
            .Skip(pageIndex * pageSize)
            .Take(pageSize)
            .ToList());
    }
}
