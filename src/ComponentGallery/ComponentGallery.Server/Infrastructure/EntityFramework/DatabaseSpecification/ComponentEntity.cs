using System.ComponentModel.DataAnnotations.Schema;

namespace ComponentGallery.Server.Infrastructure.EntityFramework.DatabaseSpecification;

[Table("Components", Schema="Gallery")]
public class ComponentEntity
{
    public required int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required int Type { get; set; }
    [Column(TypeName = "decimal(18,2)")]
    public required decimal Price { get; set; }

    public string? ImageUrl { get; set; }
    public virtual ICollection<SpecificationEntity> Specifications { get; set; } = [];
}
