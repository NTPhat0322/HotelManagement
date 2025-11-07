
using System.ComponentModel.DataAnnotations;

namespace Domain.ValueObjects
{
    public class FullName
    {
        [Required]
        public string FirstName { get; private set; } = string.Empty;
        [Required]
        public string LastName { get; private set; } = string.Empty;
        private FullName() { }
        public FullName(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
        }

        public override string ToString()
        {
            return $"{FirstName} {LastName}";
        }
    }
}
