using Domain.Aggregate;
using Domain.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(IAMServiceDbContext context) : base(context)
        {
        }

        public override async Task<User?> GetByIdAsync(Guid id)
        {
            return await _dbSet.Include(u => u.Role).FirstOrDefaultAsync(u => u.UserId == id);
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _dbSet.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetUserByPhoneNumber(string phoneNumber)
        {
            return await _dbSet.Include(u => u.Role).FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
        }
    }
}
