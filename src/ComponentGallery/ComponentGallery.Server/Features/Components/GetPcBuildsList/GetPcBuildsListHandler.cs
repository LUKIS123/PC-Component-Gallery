using ComponentGallery.Server.Features.Components.Models;
using ComponentGallery.Server.Features.Components.Repositories;

namespace ComponentGallery.Server.Features.Components.GetPcBuildsList;

internal class GetPcBuildsListHandler(IPcBuildsRepository pcBuildsRepository)
{
    private const int PageSize = 10;

    public async Task<List<PcBuild>> Handle(int pageIndex, CancellationToken cancellationToken)
    {
        return await pcBuildsRepository.GetPcBuildListAsync(pageIndex, PageSize, cancellationToken);
    }
}
