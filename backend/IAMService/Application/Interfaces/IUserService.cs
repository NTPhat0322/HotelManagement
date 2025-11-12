
using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Application.Helpers;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task<GenericResult<RegisterResponse>> RegisterUserAsync(RegisterRequest request);
        Task<GenericResult<LoginResponse>> LoginAsync(LoginRequest request);
    }
}
