using Application.DTOs.Requests;
using Application.Interfaces;
using Domain.Aggregate;
using Domain.Repositories;

namespace Application.Services
{
    public class RoleService(IUnitOfWork unitOfWork) : IRoleService
    {
        public async Task<bool> CreateRoleAsync(CreateRoleRequest request)
        {
            await unitOfWork.BeginTransactionAsync();
            var role = new Role(request.RoleName);
            await unitOfWork.RoleRepository.AddAsync(role);
            int rs =  await unitOfWork.CommitTransactionAsync();
            if(rs <= 0)
                throw new Exception("Create role failed.");
            return true;
        }
    }
}
