using Domain.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore.Storage;


namespace Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IAMServiceDbContext _context;
        private IDbContextTransaction? _transaction;

        public IUserRepository UserRepository { get; }
        public IRoleRepository RoleRepository { get; }
        public IRefreshTokenRepository RefreshTokenRepository { get; }
        public UnitOfWork(IAMServiceDbContext context, IUserRepository userRepository, IRoleRepository roleRepository, IRefreshTokenRepository refreshTokenRepository)
        {
            _context = context;
            UserRepository = userRepository;
            RoleRepository = roleRepository;
            RefreshTokenRepository = refreshTokenRepository;
        }

        public async Task BeginTransactionAsync()
        {
            if (_transaction is null)
            {
                _transaction = await _context.Database.BeginTransactionAsync();
            }
        }

        public async Task<int> CommitTransactionAsync()
        {
            try
            {
                var rs = await _context.SaveChangesAsync();
                if(_transaction is not null)
                {
                    await _transaction.CommitAsync();
                }
                return rs;
            }
            catch
            {
                await RollbackAsync();
                await DisposeTransactionAsync();
                throw;
            }
            finally
            {
                await DisposeTransactionAsync();
            }
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        private async Task RollbackAsync()
        {
            if (_transaction is not null)
            {
                await _transaction.RollbackAsync();
            }
        }

        private async Task DisposeTransactionAsync()
        {
            if (_transaction is not null)
            {
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }
    }
}
