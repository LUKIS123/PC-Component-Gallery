using System.ComponentModel.DataAnnotations.Schema;

namespace ComponentGallery.Server.Infrastructure.EntityFramework.DatabaseSpecification;

[Table("Specifications", Schema = "Gallery")]
public class SpecificationEntity
{
    public required Guid Id { get; set; }
    public required string Key { get; set; }
    public required string Value { get; set; }

    [ForeignKey("ComponentId")]
    public virtual ComponentEntity? Component { get; set; }
}
