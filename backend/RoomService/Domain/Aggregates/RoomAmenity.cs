using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Aggregates
{
    public class RoomAmenity
    {
        public Guid RoomId { get; private set; }
        public Guid AmenityId { get; private set; }
        //navigation properties
        public Room Room { get; private set; } = null!;
        public Amenitiy Amenitiy { get; private set; } = null!;
        private RoomAmenity() { }
        public RoomAmenity(Room room, Amenitiy emenity)
        {
            Room = room;
            Amenitiy = emenity;
        }
    }
}
