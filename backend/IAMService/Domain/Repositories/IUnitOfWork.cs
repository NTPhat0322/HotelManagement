using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        //repo
        public IUserRepository UserRepository { get; }
        //----
        Task BeginTransactionAsync();
        Task<int> CommitTransactionAsync();
    }
}
