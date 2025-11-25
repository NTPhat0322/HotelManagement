using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Application.Helpers;
using Application.Interfaces;
using Domain.Aggregate;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GenericResult<LoginResponse>> LoginAsync(LoginRequest request)
        {
            //tìm user theo email
            var user = await _unitOfWork.UserRepository.GetUserByEmailAsync(request.PhoneNumOrEmail);
            //nếu không tìm thấy thì tìm theo số điện thoại
            if (user is null)
            {
                user = await _unitOfWork.UserRepository.GetUserByPhoneNumber(request.PhoneNumOrEmail);
                if (user is null)
                    return GenericResult<LoginResponse>.Failure("email or phone number does not exist.");
            }
            //đã tìm thấy user, kiểm tra password
            bool isPasswordValid = PasswordHasher.VerifyPassword(request.Password, user.HashedPassword);
            if (!isPasswordValid)
                return GenericResult<LoginResponse>.Failure("password is not correct");
            //tạo access token và refresh token
            var accessToken = JwtHelper.CreateToken(user);
            var refreshToken = RefreshTokenHelper.GenerateRefreshToken();

            await _unitOfWork.BeginTransactionAsync();
            var hashedRefreshToken = RefreshTokenHelper.HashRefreshToken(refreshToken);
            var refreshTokenEntity = new RefreshToken(hashedRefreshToken, user);
            await _unitOfWork.RefreshTokenRepository.AddAsync(refreshTokenEntity);
            var rs = await _unitOfWork.CommitTransactionAsync();
            if(rs <= 0)
                return GenericResult<LoginResponse>.Failure("login failed by saving refresh token to db.");

            return GenericResult<LoginResponse>.Success( new LoginResponse
            {
                UserId = user.UserId.ToString(),
                AccessToken = accessToken,
                RefreshToken = refreshToken
            }, "Login successfully.");
        }

        public async Task<Result> RegisterUserAsync(RegisterRequest request)
        {
            await _unitOfWork.BeginTransactionAsync();
            //kiểm tra xem email và số điện thoại đã tồn tại chưa
            var user = await _unitOfWork.UserRepository.GetUserByEmailAsync(request.Email);
            if (user is not null)
                //throw new Exception("Email already exists.");
                return Result.Failure("Email already exists.");
            user = null;
            user = await _unitOfWork.UserRepository.GetUserByPhoneNumber(request.PhoneNumber);
            if (user is not null)
                return Result.Failure("Phone number already exists.");
            //tạo user mới
            //1. hash password
            var hashedPassword = PasswordHasher.HashPassword(request.Password);
            //get role user
            var roleUser = await _unitOfWork.RoleRepository.GetRoleByNameAsync("User");
            var newUser = new User(request.Email, hashedPassword, request.FirstName, request.LastName, request.PhoneNumber, request.DateOfBirth, request.Address, request.Ward, request.District, request.City);
            newUser.SetRole(roleUser!);
            //2. tạo refreshtoken
            //var refreshToken = RefreshTokenHelper.GenerateRefreshToken();
            //3. tạo access token
            //var accessToken = JwtHelper.CreateToken(newUser);
            //lưu user vào database
            await _unitOfWork.UserRepository.AddAsync(newUser);
            int rs = await _unitOfWork.CommitTransactionAsync();
            if (rs <= 0)
                throw new DbUpdateException("Register user failed by saving db.");
            
            return Result.Success("Register user successfully.");
        }
    }
}
