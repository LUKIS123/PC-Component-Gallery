using ComponentGallery.Server.Features.Components.Models;
using ComponentGallery.Server.Features.Components.Repositories;

namespace ComponentGallery.Server.Features.Components.GetComponentsList;

internal class GetComponentsListHandler(IComponentRepository componentRepository)
{
    private const int PageSize = 10;

    public async Task<List<ComputerComponent>> Handle(int pageIndex, CancellationToken cancellationToken)
    {
        return await componentRepository.GetComponentsListAsync(pageIndex, PageSize, cancellationToken);
    }
}
