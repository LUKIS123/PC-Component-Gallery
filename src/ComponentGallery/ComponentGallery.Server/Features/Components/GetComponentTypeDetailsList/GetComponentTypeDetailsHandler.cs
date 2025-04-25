using ComponentGallery.Server.Features.Components.Models;
using ComponentGallery.Server.Features.Components.Repositories;

namespace ComponentGallery.Server.Features.Components.GetComponentTypeDetails
{
    internal class GetComponentTypeDetailsListHandler(IComponentRepository componentRepository)
    {
        public async Task<List<ComponentTypeDetails>> Handle(CancellationToken cancellationToken)
        {
            return await componentRepository.GetComponentTypeDetailsAsync(
                cancellationToken);
        }
    }
}
