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
            var refreshTokens = await _unitOfWork.RefreshTokenRepository.GetAllAsync(true);
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
                return GenericResult<RefreshTokenResponse>.Failure("reuse-detection");
            }

            //tìm user tương ứng của refresh token
            User? user = await _unitOfWork.UserRepository.GetByIdAsync(validToken.UserId);
            if (user is null)
                return GenericResult<RefreshTokenResponse>.Failure("User not found for the provided refresh token.");
            
            //tao refresh token moi
            var newRefreshToken = RefreshTokenHelper.GenerateRefreshToken();
            var hashedNewRefreshToken = RefreshTokenHelper.HashRefreshToken(newRefreshToken);
            var newAccessToken = JwtHelper.CreateToken(user);

            //revoke old refresh token
            RevokeRefreshToken(validToken, "Replaced by new token", hashedNewRefreshToken);

            //tao refresh token entity de luu vao db
            var newRefreshTokenEntity = new RefreshToken(hashedNewRefreshToken, user, validToken.FamilyId);
            await _unitOfWork.RefreshTokenRepository.AddAsync(newRefreshTokenEntity);
            int rs = await _unitOfWork.CommitTransactionAsync();

            if(rs <= 0)
                return GenericResult<RefreshTokenResponse>.Failure("Failed to saving new refresh token into database");

            return GenericResult<RefreshTokenResponse>.Success(new RefreshTokenResponse() { 
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            }, "refresh token successfully");
        }
    
        private async Task RevokeAllRefreshTokenByFamilyId(string familyId, string reason)
        {
            await _unitOfWork.BeginTransactionAsync();
            var refreshTokens = await _unitOfWork.RefreshTokenRepository.GetAllAsync(true);
            foreach (var refreshToken in refreshTokens)
            {
                if(refreshToken.FamilyId.ToString() == familyId)
                {
                    refreshToken.Revoke(reason, DateTime.UtcNow);
                }
            }
            await _unitOfWork.CommitTransactionAsync();
        }

        private void RevokeRefreshToken(RefreshToken refreshToken, string reason, string replacedByHashedToken = "")
        {
            //make it not latest
            refreshToken.SetIsLatest(false);
            //set used at
            refreshToken.SetUsedAt(DateTime.UtcNow);
            //revoke
            refreshToken.Revoke(reason, DateTime.UtcNow, replacedByHashedToken);
        }
    }
}
