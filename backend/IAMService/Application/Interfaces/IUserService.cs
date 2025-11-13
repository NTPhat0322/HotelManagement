
using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Application.Helpers;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task<Result> RegisterUserAsync(RegisterRequest request);
        Task<GenericResult<LoginResponse>> LoginAsync(LoginRequest request);
    }
}
