using Application.DTOs.Requests;
using FluentValidation;

namespace API.FluentValidation
{
    public class LoginValidator : AbstractValidator<LoginRequest>
    {
        public LoginValidator()
        {
            RuleFor(lq => lq.PhoneNumOrEmail)
                .NotNull().WithMessage("Phone number or email is required.")
                .NotEmpty().WithMessage("Phone number or email cannot be empty.");

            RuleFor(lq => lq.Password)
                .NotNull().WithMessage("Password is required.")
                .NotEmpty().WithMessage("Password cannot be empty.")
                .MinimumLength(6).WithMessage("Password must be at least 6 characters long.");
        }
    }
}
