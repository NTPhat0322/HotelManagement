
using Application.DTOs.Requests;
using Application.DTOs.Responses;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task<RegisterResponse> RegisterUserAsync(RegisterRequest request);
    }
}
