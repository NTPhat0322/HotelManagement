using System.ComponentModel.DataAnnotations;

namespace Domain.Aggregate
{
    public class RefreshToken
    {
        [Key]
        public Guid RefreshTokenId { get; private set; } = Guid.NewGuid();
        public string HashedToken { get; private set; } = string.Empty;
        public Guid FamilyId { get; private set; } = Guid.NewGuid();
        public bool IsLatest { get; private set; } = true;
        public DateTime? UsedAt { get; private set; } = null;
        public bool IsRevoked { get; private set; } = false;
        public DateTime? RevokedAt { get; private set; }
        public string RevokedReason { get; private set; } = string.Empty;
        public string ReplacedByHashedToken { get; private set; } = string.Empty;
        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
        public DateTime ExpiresAt { get; private set; } = DateTime.UtcNow.AddDays(7);
        public string CreatedByIp { get; private set; } = string.Empty;

        //navigation property
        [Required]
        public Guid UserId { get; private set; }
        [Required]
        public User User { get; private set; } = null!;

        private RefreshToken() { }

        public RefreshToken(string hashedToken, User user)
        {
            HashedToken = hashedToken;
            User = user;
        }
        public void SetUsedAt(DateTime? dateTime = null)
        {
            UsedAt = dateTime ?? DateTime.UtcNow;
        }

        public void Revoke(string reason = "", DateTime? revokedAt = null, string replacedByHashedToken = "")
        {
            IsRevoked = true;
            RevokedReason = reason;
            RevokedAt = revokedAt ?? DateTime.UtcNow;
            ReplacedByHashedToken = replacedByHashedToken;
        }
    }
}
