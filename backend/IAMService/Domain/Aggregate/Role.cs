using Domain.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Aggregate
{
    public class Role : BaseEntity
    {
        [Key]
        public Guid RoleId { get; private set; } = Guid.NewGuid();
        [Required]
        public string RoleName { get; private set; } = string.Empty;
        
        private Role() { }
        public Role(string roleName)
        {
            RoleName = roleName;
        }
    }
}
