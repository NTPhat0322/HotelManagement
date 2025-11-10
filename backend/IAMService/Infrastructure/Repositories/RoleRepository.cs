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
    public class RoleRepository : GenericRepository<Role>, IRoleRepository
    {
        public RoleRepository(IAMServiceDbContext context) : base(context)
        {
        }

        public async Task<Role?> GetRoleByNameAsync(string name)
        {
            var role = await _dbSet.FirstOrDefaultAsync(r => r.RoleName.ToLower() == name.ToLower());
            return role;
        }
    }
}
