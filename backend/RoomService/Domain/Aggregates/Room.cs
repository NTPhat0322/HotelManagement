using Domain.Abstracts;
using Domain.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Aggregates
{
    public class Room : BaseEntity
    {
        [Key]
        public Guid RoomId { get; private set; } = Guid.NewGuid();
        [Required]
        public string RoomNumber { get; private set; } = string.Empty;
        public int Floor { get; private set; }
        [Required]
        public RoomStatusEnum Status { get; private set; } = RoomStatusEnum.Available;
        [Required]
        public decimal BasePrice { get; private set; } = 0;
        public string Description { get; private set; } = string.Empty;

        //navigation properties
        public Guid RoomTypeId { get; private set; }
        public RoomType RoomType { get; private set; } = null!;

        private Room() { }
        public Room(string roomNumber, decimal basePrice, RoomStatusEnum status, int floor, RoomType roomType, string description = "")
        {
            RoomNumber = roomNumber;
            Floor = floor;
            BasePrice = basePrice;
            RoomType = roomType;
            Status = status;
            Description = description;
        }
    }
}
