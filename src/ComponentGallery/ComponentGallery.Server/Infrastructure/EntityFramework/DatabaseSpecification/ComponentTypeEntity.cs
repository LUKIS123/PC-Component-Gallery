using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ComponentGallery.Server.Infrastructure.EntityFramework.DatabaseSpecification
{
    [Table("ComponentTypes", Schema = "Gallery")]
    public class ComponentTypeEntity
    {
        [Key]
        public required int ComponentTypeId { get; set; }
        public required string Name { get; set; }
        public string? ImageUrl { get; set; }
    }
}
