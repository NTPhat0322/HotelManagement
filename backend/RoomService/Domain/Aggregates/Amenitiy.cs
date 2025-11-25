
using Domain.Abstracts;
using System.ComponentModel.DataAnnotations;


namespace Domain.Aggregates
{
    public class Amenitiy : BaseEntity
    {
        [Key]
        public Guid AmenityId { get; set; } = Guid.NewGuid();
        [Required]
        public string AmenityName { get; set; } = string.Empty;
        private Amenitiy() { }
        public Amenitiy(string amenityName)
        {
            AmenityName = amenityName;
        }
    }
}
