using ComponentGallery.Server.Features.Components.Models;

namespace ComponentGallery.Server.Features.Components.Repositories;

internal interface IComponentRepository
{
    Task<List<ComputerComponent>> GetComponentsListAsync(int pageIndex, int? typeId, int pageSize, CancellationToken cancellationToken);
    Task<ComputerComponent?> GetComponentByIdAsync(int id, CancellationToken cancellationToken);
}
