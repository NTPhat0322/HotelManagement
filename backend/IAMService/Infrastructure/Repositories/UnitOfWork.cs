using Domain.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore.Storage;


namespace Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IAMServiceDbContext _context;
        private IDbContextTransaction? _transaction;

        public UnitOfWork(IAMServiceDbContext context)
        {
            _context = context;
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
