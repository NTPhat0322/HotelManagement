using Domain.Abstracts;
using Domain.Enum;
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
        public BedTypeEnum BedType { get; private set; } = BedTypeEnum.Single;
        public decimal SizeSqm { get; private set; } = 0;
        public string Description { get; private set; } = string.Empty;

        //navigation properties
        private readonly List<Room> _rooms = new();
        public IReadOnlyCollection<Room> Rooms => _rooms.AsReadOnly();

        private RoomType() { }
        public RoomType(string name, int maxGuests, BedTypeEnum bedType = BedTypeEnum.Single, decimal sizeSqm = 0, string description = "")
        {
            Name = name;
            MaxGuests = maxGuests;
            BedType = bedType;
            SizeSqm = sizeSqm;
            Description = description;
        }
    }
}
