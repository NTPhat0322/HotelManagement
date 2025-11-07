

using Domain.Aggregate;
using System.Security.Claims;

namespace Application.Helpers
{
    public static class JwtHelper
    {
        private static readonly string JwtKey = Environment.GetEnvironmentVariable("JWT_KEY")!;
        private static readonly string JwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER")!;
        private static readonly string JwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE")!;
    
        //public static string CreateToken(User user)
        //{
        //    var claims = new List<Claim>
        //    {

        //    };
        //}
    }
}
