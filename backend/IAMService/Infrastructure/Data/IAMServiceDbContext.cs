using Domain.Aggregate;
using Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;

namespace Infrastructure.Data
{
    public class IAMServiceDbContext : DbContext
    {
        public IAMServiceDbContext(DbContextOptions<IAMServiceDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //Address là Value Object(đối tượng sở hữu – owned entity type),
            //không phải một bảng riêng trong database, mà sẽ được lưu kèm
            //trong bảng của entity chứa nó.
            modelBuilder.Owned<Address>();
            modelBuilder.Owned<FullName>();
            modelBuilder.Entity<User>(entity =>
            {
                entity
                    .HasOne(u => u.Role)
                    .WithMany(r => r.Users)
                    .HasForeignKey(u => u.RoleId);
            });
        }
    }
}
