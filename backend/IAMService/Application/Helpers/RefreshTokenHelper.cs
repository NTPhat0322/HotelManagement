using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Application.Helpers
{
    public static class RefreshTokenHelper
    {
        public static string GenerateRefreshToken()
        {
            var randomBytes = RandomNumberGenerator.GetBytes(64);
            var token = Convert.ToBase64String(randomBytes);
            return token;
        }

        public static string HashRefreshToken(string refreshToken)
        {
            return BCrypt.Net.BCrypt.EnhancedHashPassword(refreshToken, 13);
        }

        public static bool VerifyRefreshToken(string refreshToken, string hashedRefreshToken)
        {
            return BCrypt.Net.BCrypt.EnhancedVerify(refreshToken, hashedRefreshToken);
        }


        //public static string HashRefreshToken(string refreshToken)
        //{
        //    using (var sha256 = SHA256.Create())
        //    {
        //        var bytes = Encoding.UTF8.GetBytes(refreshToken);
        //        var hash = sha256.ComputeHash(bytes);
        //        return Convert.ToBase64String(hash);
        //    }
        //}

    }
}
