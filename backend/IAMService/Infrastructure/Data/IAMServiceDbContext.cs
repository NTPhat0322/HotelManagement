using Domain.Aggregate;
using Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class IAMServiceDbContext : DbContext
    {
        public IAMServiceDbContext(DbContextOptions<IAMServiceDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
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
                entity.Property(u => u.Email)
                    .HasMaxLength(255);
                entity.Property(u => u.PhoneNumber)
                    .HasMaxLength(20);
                entity
                    .HasOne(u => u.Role)
                    .WithMany(r => r.Users)
                    .HasForeignKey(u => u.RoleId);
            });
            modelBuilder.Entity<RefreshToken>(entity =>
            {
                entity.HasIndex(rf => rf.HashedToken).IsUnique();
                entity.HasIndex(rf => new { rf.FamilyId, rf.IsLatest })
                        .HasFilter("[IsLatest] = 1")
                        .IsUnique();
            });
        
        }
    }
}
