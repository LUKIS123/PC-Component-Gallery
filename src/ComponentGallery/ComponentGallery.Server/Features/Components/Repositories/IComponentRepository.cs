using ComponentGallery.Server.Features.Components.Models;

namespace ComponentGallery.Server.Features.Components.Repositories;

internal interface IComponentRepository
{
    Task<List<ComputerComponent>> GetComponentsListAsync(int? typeId, int pageSize, CancellationToken cancellationToken);
    Task<ComputerComponent?> GetComponentByIdAsync(int id, CancellationToken cancellationToken);
    Task<ComponentTypeDetails?> GetComponentTypeDetailsByIdAsync(int typeId, CancellationToken cancellationToken);
    Task<List<ComponentTypeDetails>> GetComponentTypeDetailsAsync(CancellationToken cancellationToken);
}
