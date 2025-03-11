using ComponentGallery.Server.Features.Components.Models;
using ComponentGallery.Server.Features.Components.Repositories;

namespace ComponentGallery.Server.Features.Components.GetComponentDetails;

internal class GetComponentDetailsHandler(IComponentRepository componentRepository)
{
    public async Task<ComputerComponent?> Handle(int id, CancellationToken cancellationToken)
    {
        return await componentRepository.GetComponentByIdAsync(id, cancellationToken);
    }
}
