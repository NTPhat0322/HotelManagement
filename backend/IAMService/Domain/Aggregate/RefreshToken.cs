using System.ComponentModel.DataAnnotations;

namespace Domain.Aggregate
{
    public class RefreshToken
    {
        [Key]
        public Guid RefreshTokenId { get; private set; } = new Guid();
        public string HashedToken { get; private set; } = string.Empty;
        public Guid FamilyId { get; private set; } = new Guid();
        public bool IsLatest { get; private set; } = true;
        public DateTime? UsedAt { get; private set; } = null;
        public bool IsRevoked { get; private set; } = false;
        public DateTime? RevokedAt { get; private set; }
        public string RevokedReason { get; private set; } = string.Empty;
        public string ReplacedByHashedToken { get; private set; } = string.Empty;
        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
        public DateTime ExpiresAt { get; private set; } = DateTime.UtcNow.AddDays(30);
        public string CreatedByIp { get; private set; } = string.Empty;

        //navigation property
        [Required]
        public Guid UserId { get; private set; }
        [Required]
        public User User { get; private set; } = null!;

        public RefreshToken(string hashedToken, User user)
        {
            HashedToken = hashedToken;
            User = user;
        }
    }
}
