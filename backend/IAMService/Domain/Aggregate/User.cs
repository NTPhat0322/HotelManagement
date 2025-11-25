using Domain.Abstract;
using Domain.ValueObjects;
using System.ComponentModel.DataAnnotations;

namespace Domain.Aggregate
{
    public class User : BaseEntity
    {
        [Key]
        public Guid UserId { get; private set; } = Guid.NewGuid();
        [EmailAddress, Required]
        public string Email { get; private set; } = string.Empty;
        [Required]
        public string PhoneNumber { get; private set; } = string.Empty;
        [Required]
        public string HashedPassword { get; private set; } = string.Empty;
        [Required]
        public FullName UserName { get; private set; } = null!;
        public DateTime? DateOfBirth { get; private set; }
        public Address Address { get; private set; } = null!;

        //navigation property
        [Required]
        public Guid RoleId { get; private set; }
        public Role Role { get; private set; } = null!;

        private readonly List<RefreshToken> _refreshTokens = new();
        public IReadOnlyCollection<RefreshToken> RefreshTokens => _refreshTokens.AsReadOnly();

        private User() { }
        public User(string email, string hashedPassword, string firstName, string lastName,
            string phoneNumber = "", DateTime? dateOfBirth = null, string detailAddress = "", string ward = "",
            string district = "", string city = "")
        {
            Email = email;
            HashedPassword = hashedPassword;
            UserName = new FullName(firstName, lastName);
            PhoneNumber = phoneNumber;
            DateOfBirth = dateOfBirth;
            Address = new Address(detailAddress, ward, district, city);
        }

        //email setter
        public void SetEmail(string email)
        {
            Email = email;
        }
        //phone number setter
        public void SetPhoneNumber(string phoneNumber)
        {
            PhoneNumber = phoneNumber;
        }
        //hashed password setter
        public void SetHashedPassword(string hashedPassword)
        {
            HashedPassword = hashedPassword;
        }
        //username setter
        public void SetUserName(string firstName = "", string lastName = "")
        {
            UserName.SetFirstName(firstName);
            UserName.SetLastName(lastName);
        }
        //date of birth setter
        public void SetDateOfBirth(DateTime? dateOfBirth)
        {
            DateOfBirth = dateOfBirth;
        }
        public void SetAddress(string detailAddress = "", string ward = "",
            string district = "", string city = "")
        {
            Address.SetDetailAddress(detailAddress);
            Address.SetWard(ward);
            Address.SetDistrict(district);
            Address.SetCity(city);
        }
        public void SetRole(Role role)
        {
            Role = role;
        }
    }
}
