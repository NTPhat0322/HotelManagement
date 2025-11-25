

namespace Domain.Abstracts
{
    public abstract class BaseEntity
    {
        public bool IsDeleted { get; private set; } = false;
        public DateTime? DeletedAt { get; private set; }
        public string? DeletedBy { get; private set; }
        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
        public string? CreatedBy { get; private set; }
        public DateTime? UpdatedAt { get; private set; }
        public string? UpdatedBy { get; private set; }
    }
}
