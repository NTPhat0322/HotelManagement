using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Application.Helpers;
using Application.Interfaces;
using Domain.Aggregate;
using Domain.Repositories;

namespace Application.Services
{
    public class RefreshTokenService(IUnitOfWork _unitOfWork) : IRefreshTokenService
    {
        public async Task<GenericResult<RefreshTokenResponse>> RefreshTokenAsync(RefreshTokenRequest request)
        {
            await _unitOfWork.BeginTransactionAsync();

            //get all refresh token
            var refreshTokens = await _unitOfWork.RefreshTokenRepository.GetAllAsync();
            //duyet qua toan bo de tim hashed refresh token
            RefreshToken? validToken = null;
            foreach (var token in refreshTokens)
            {
                if(RefreshTokenHelper.VerifyRefreshToken(request.RefreshToken, token.HashedToken))
                {
                    validToken = token;
                    break;
                }
            }
            if (validToken is null)
                return GenericResult<RefreshTokenResponse>.Failure("Invalid refresh token.");
            //kiểm tra xem refresh token đã hết hạn chưa
            if(validToken.ExpiresAt < DateTime.UtcNow)
            {
                validToken.SetUsedAt(DateTime.UtcNow);
                validToken.Revoke("Refresh token expired", DateTime.UtcNow, "");
                return GenericResult<RefreshTokenResponse>.Failure("Refresh token has expired.");
            }
            //check xem co reuse-detection
            if(validToken.IsLatest is false || validToken.IsRevoked is true || validToken.UsedAt is not null)
            {
                //vô hiệu hóa toàn bộ family của rf token
                await RevokeAllRefreshTokenByFamilyId(validToken.FamilyId.ToString(), "reuse-detection");
            }

            //tìm user tương ứng của refresh token
            User? user = await _unitOfWork.UserRepository.GetByIdAsync(validToken.UserId);
            if (user is null)
                return GenericResult<RefreshTokenResponse>.Failure("User not found for the provided refresh token.");
            
            //tao refresh token moi
            var newRefreshToken = RefreshTokenHelper.GenerateRefreshToken();
            var newAccessToken = JwtHelper.CreateToken(user);


            return GenericResult<RefreshTokenResponse>.Failure("Refresh token has expired.");
        }
    
        private async Task RevokeAllRefreshTokenByFamilyId(string familyId, string reason)
        {
            await _unitOfWork.BeginTransactionAsync();
            var refreshTokens = await _unitOfWork.RefreshTokenRepository.GetAllAsync();
            foreach (var refreshToken in refreshTokens)
            {
                if(refreshToken.FamilyId.ToString() == familyId)
                {
                    refreshToken.Revoke(reason, DateTime.UtcNow);
                }
            }
            await _unitOfWork.CommitTransactionAsync();
        }
    }
}
