using Application.DTOs.Requests;
using Application.DTOs.Responses;
using Application.Helpers;
using Application.Interfaces;
using Domain.Aggregate;
using Domain.Repositories;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<GenericResult<RegisterResponse>> RegisterUserAsync(RegisterRequest request)
        {
            await _unitOfWork.BeginTransactionAsync();
            //kiểm tra xem email và số điện thoại đã tồn tại chưa
            var user = await _unitOfWork.UserRepository.GetUserByEmailAsync(request.Email);
            if (user is not null)
                //throw new Exception("Email already exists.");
                return GenericResult<RegisterResponse>.Failure("Email already exists.");
            user = null;
            user = await _unitOfWork.UserRepository.GetUserByPhoneNumber(request.PhoneNumber);
            if (user is not null)
                return GenericResult<RegisterResponse>.Failure("Phone number already exists.");
            //tạo user mới
            //1. hash password
            var hashedPassword = PasswordHasher.HashPassword(request.Password);
            //get role user
            var roleUser = await _unitOfWork.RoleRepository.GetRoleByNameAsync("User");
            var newUser = new User(request.Email, hashedPassword, request.FirstName, request.LastName, request.PhoneNumber, request.DateOfBirth, request.AddressNumber ?? 0, request.Street, request.District, request.City, request.Country);
            newUser.SetRole(roleUser!);
            //2. tạo refreshtoken
            var refreshToken = RefreshTokenHelper.GenerateRefreshToken();
            //3. tạo access token
            var accessToken = JwtHelper.CreateToken(newUser);
            //lưu user vào database
            await _unitOfWork.UserRepository.AddAsync(newUser);
            int rs = await _unitOfWork.CommitTransactionAsync();
            if(rs <= 0)
                throw new Exception("Register user failed by saving db.");
            return GenericResult<RegisterResponse>.Success(new RegisterResponse
            {
                UserId = newUser.UserId.ToString(),
                AccessToken =  accessToken,
                RefreshToken = refreshToken
            }, "Register user successfully.");
        }
    }
}
