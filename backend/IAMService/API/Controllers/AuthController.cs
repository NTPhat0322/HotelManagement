using Application.DTOs.Requests;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IUserService userService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterRequest request)
        {
            var response = await userService.RegisterUserAsync(request);
            return response.IsSuccess 
                ? Ok(response) 
                : BadRequest(response);
        }


    }
}
