

namespace Application.DTOs.Requests
{
    public class LoginRequest
    {
        public string PhoneNumOrEmail { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
