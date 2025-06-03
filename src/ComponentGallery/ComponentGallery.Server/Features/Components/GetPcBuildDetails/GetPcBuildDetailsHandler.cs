using ComponentGallery.Server.Features.Components.Models;
using ComponentGallery.Server.Features.Components.Repositories;

namespace ComponentGallery.Server.Features.Components.GetPcBuildDetails;

internal class GetPcBuildDetailsHandler(IPcBuildsRepository pcBuildsRepository)
{
    public async Task<PcBuild?> Handle(int id, CancellationToken cancellationToken)
    {
        return await pcBuildsRepository.GetPcBuildByIdAsync(id, cancellationToken);
    }
}
