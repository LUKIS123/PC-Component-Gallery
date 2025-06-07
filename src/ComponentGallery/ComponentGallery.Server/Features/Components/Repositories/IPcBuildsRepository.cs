using ComponentGallery.Server.Features.Components.Models;

namespace ComponentGallery.Server.Features.Components.Repositories;

public interface IPcBuildsRepository
{
    Task<List<PcBuild>> GetPcBuildListAsync(int pageIndex, int pageSize, CancellationToken cancellationToken);
    Task<PcBuild?> GetPcBuildByIdAsync(int id, CancellationToken cancellationToken);
}