using ComponentGallery.Server.Features.Components.Models;
using ComponentGallery.Server.Features.Components.Repositories;

namespace ComponentGallery.Server.Features.Components.GetComponentTypeDetails
{
    internal class GetComponentTypeDetailsHandler(IComponentRepository componentRepository)
    {
        public async Task<ComponentTypeDetails?> Handle(int typeId, CancellationToken cancellationToken) 
        {
            return await componentRepository.GetComponentTypeDetailsByIdAsync(typeId, cancellationToken);
        }
    }
}
