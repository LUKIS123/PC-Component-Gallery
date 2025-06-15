using ComponentGallery.Server.Features.Components.Models;
using ComponentGallery.Server.Features.Components.Repositories;

namespace ComponentGallery.Server.Features.Components.GetComponentsList;

internal class GetComponentsListHandler(IComponentRepository componentRepository)
{
    private const int PageSize = 100;

    public async Task<List<ComputerComponent>> Handle(int? typeId, CancellationToken cancellationToken)
    {
        return await componentRepository.GetComponentsListAsync(typeId, PageSize, cancellationToken);
    }
}
