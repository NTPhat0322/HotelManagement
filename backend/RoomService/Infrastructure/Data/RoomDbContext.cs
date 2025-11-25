using Domain.Aggregates;
using Microsoft.EntityFrameworkCore;
namespace Infrastructure.Data
{
    public class RoomDbContext : DbContext
    {
        public RoomDbContext(DbContextOptions<RoomDbContext> options) : base(options)
        {
        }

        public DbSet<Amenitiy> Amenities { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }
        public DbSet<RoomAmenity> RoomAmenities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<RoomAmenity>()
                .HasKey(ra => new { ra.RoomId, ra.AmenityId });
            modelBuilder.Entity<RoomAmenity>()
                .HasOne(ra => ra.Room)
                .WithMany()
                .HasForeignKey(ra => ra.RoomId);
            modelBuilder.Entity<RoomAmenity>()
                .HasOne(ra => ra.Amenitiy)
                .WithMany()
                .HasForeignKey(ra => ra.AmenityId);

            modelBuilder.Entity<Room>(entity => { 
                entity.Property(r => r.BasePrice).HasColumnType("decimal(18,2)");
                entity.Property(r => r.Description).HasMaxLength(1000);
                entity.Property(r => r.RoomNumber).HasMaxLength(50);
                entity
                    .HasOne(r => r.RoomType)
                    .WithMany(rt => rt.Rooms)
                    .HasForeignKey(r => r.RoomTypeId);
            });

            modelBuilder.Entity<RoomType>(entity =>
            {
                entity.Property(rt => rt.SizeSqm).HasColumnType("decimal(18,2)");
                entity.Property(rt => rt.Description).HasMaxLength(1000);
                entity.Property(rt => rt.Name).HasMaxLength(100);
            });
        }
    }
}
