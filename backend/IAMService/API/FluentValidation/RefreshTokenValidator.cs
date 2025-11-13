using Application.DTOs.Requests;
using FluentValidation;

namespace API.FluentValidation
{
    public class RefreshTokenValidator : AbstractValidator<RefreshTokenRequest>
    {
        public RefreshTokenValidator()
        {
            RuleFor(req => req.RefreshToken)
                .NotEmpty().WithMessage("Refresh token must not be empty.");
        }
    }
}
