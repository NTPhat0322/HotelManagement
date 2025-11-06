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
        public string? PhoneNumber { get; private set; }
        [Required]
        public string HashedPassword { get; private set; } = string.Empty;
        [Required]
        public FullName UserName { get; private set; } = null!;
        public DateTime? DateOfBirth { get; private set; }
        public Address Address { get; private set; } = null!;

        private User() { }
        public User(string email, string hashedPassword, string firstName, string lastName,
            string? phoneNumber = null, DateTime? dateOfBirth = null, int number = 0, string street = "",
            string district = "", string city = "", string country = "")
        {
            Email = email;
            HashedPassword = hashedPassword;
            UserName = new FullName(firstName, lastName);
            PhoneNumber = phoneNumber;
            DateOfBirth = dateOfBirth;
            Address = new Address(number, street, district, city, country);
        }
    }
}
