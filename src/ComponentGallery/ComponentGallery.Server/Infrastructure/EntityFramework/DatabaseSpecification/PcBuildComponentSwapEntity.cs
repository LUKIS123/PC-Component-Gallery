using ComponentGallery.Server.Infrastructure.BlobService.Models;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace ComponentGallery.Server.Infrastructure.EntityFramework.DatabaseSpecification;

[Table("PcBuildSwaps", Schema = "Gallery")]
public class PcBuildComponentSwapEntity
{
    public Guid Id { get; set; }

    public int PcBuildId { get; set; }

    public int ComponentId { get; set; }

    public PcAssemblySwappablePartType Type { get; set; }

    // Navigation properties
    public virtual required PcBuildEntity PcBuild { get; set; }

    public virtual required ComponentEntity Component { get; set; }
}