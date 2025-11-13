using Application.DTOs.Requests;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IUserService userService, IRefreshTokenService refreshTokenService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterRequest request)
        {
            var response = await userService.RegisterUserAsync(request);
            return response.IsSuccess 
                ? Ok(response) 
                : BadRequest(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await userService.LoginAsync(request);
            return response.IsSuccess 
                ? Ok(response) 
                : BadRequest(response);
        }
        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var response = await refreshTokenService.RefreshTokenAsync(request);
            return response.IsSuccess
                ? Ok(response)
                : BadRequest(response);
        }
    }
}
