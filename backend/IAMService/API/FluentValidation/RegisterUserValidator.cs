using Application.DTOs.Requests;
using FluentValidation;

namespace API.FluentValidation
{
    public class RegisterUserValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterUserValidator()
        {
            //required fields
            RuleFor(r => r.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Invalid email format")
                .MaximumLength(255).WithMessage("Email must not exceed 255 characters");
            RuleFor(r => r.PhoneNumber)
                .NotEmpty().WithMessage("Phone number is required")
                .MaximumLength(20).WithMessage("Phone number must not exceed 20 characters");
            RuleFor(r => r.Password)
                .NotEmpty().WithMessage("Password is required")
                .MinimumLength(6).WithMessage("Password must be at least 6 characters long");
            RuleFor(r => r.FirstName)
                .NotEmpty().WithMessage("First name is required")
                .MaximumLength(50).WithMessage("First name must not exceed 50 characters");
            RuleFor(r => r.LastName)
                .NotEmpty().WithMessage("Last name is required")
                .MaximumLength(50).WithMessage("Last name must not exceed 50 characters");

            //optional fields
            RuleFor(r => r.DateOfBirth)
                .LessThanOrEqualTo(_ => DateTime.Now.AddYears(-10)).WithMessage("User must be at least 10 years old")
                //Dùng biểu thức lambda để lấy thời gian hiện tại tại thời điểm validate:
                .When(r => r.DateOfBirth.HasValue);
            RuleFor(r => r.AddressNumber)
                .GreaterThan(0).When(r => r.AddressNumber.HasValue) //address khác null thì mới 
                                                                    //thực hiện so sánh giá trị
                .WithMessage("Address number must be greater than 0");
            RuleFor(r => r.Street)
                .MaximumLength(100).When(r => !string.IsNullOrEmpty(r.Street))
                .WithMessage("Street must not exceed 100 characters");
            RuleFor(r => r.District)
                .MaximumLength(100).When(r => !string.IsNullOrEmpty(r.District))
                .WithMessage("District must not exceed 100 characters");
            RuleFor(r => r.City)
                .MaximumLength(100).When(r => !string.IsNullOrEmpty(r.City))
                .WithMessage("City must not exceed 100 characters");
            RuleFor(r => r.Country)
                .MaximumLength(100).When(r => !string.IsNullOrEmpty(r.Country))
                .WithMessage("Country must not exceed 100 characters");
        }
    }
}
