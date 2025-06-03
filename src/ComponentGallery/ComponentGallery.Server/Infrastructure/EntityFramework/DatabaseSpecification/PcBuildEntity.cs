using System.ComponentModel.DataAnnotations.Schema;

namespace ComponentGallery.Server.Infrastructure.EntityFramework.DatabaseSpecification;

[Table("PcBuilds", Schema = "Gallery")]
public class PcBuildEntity
{
    public required int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    [Column(TypeName = "decimal(18,2)")]
    public required decimal Price { get; set; }

    public virtual ICollection<PcBuildComponentSwapEntity> Swaps { get; set; } = [];
}