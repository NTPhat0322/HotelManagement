using Domain.Abstracts;
using System.ComponentModel.DataAnnotations;

namespace Domain.Aggregates
{
    public class RoomType : BaseEntity
    {
        [Key]
        public Guid RoomTypeId { get; private set; } = Guid.NewGuid();
        [Required]
        public string Name { get; private set; } = string.Empty;
        [Required]
        public int MaxGuests { get; private set; }

    }
}
