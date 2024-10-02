using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace backend.Services
{
    public interface IAccountService
    {
        Task<IEnumerable<Account>> GetAllAccountsAsync();
        Task<Account> GetAccountByNameAsunc(string name);
        Task<Account> GetAccountByIdAsync(int id);
        Task<Account> CreateAccountAsync(Account account);
        Task<Account> UpdateAccountAsync(int id, Account updatedAccount);
        Task<Account> DeleteAccountAsync(int id);

    }
    public class AccountService : IAccountService
    {
        private readonly ApplicationDbContext _context;

        public AccountService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Account>> GetAllAccountsAsync()
        {
            return await _context.Accounts.ToListAsync();
        }
        public async Task<Account> GetAccountByIdAsync(int id)
        {
            return await _context.Accounts.FindAsync(id);
        }
        public async Task<Account> GetAccountByNameAsunc(string name)
        {
            return await _context.Accounts.FirstOrDefaultAsync(a => a.Name == name);
        }
        public async Task<Account> CreateAccountAsync(Account account)
        {
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            return account;
        }
        public async Task<Account> UpdateAccountAsync(int id, Account updatedAccount)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return null;
            }
            account.Name = updatedAccount.Name;
            account.Balance = updatedAccount.Balance;
            account.Type = updatedAccount.Type;

            _context.Accounts.Update(account);
            await _context.SaveChangesAsync();
            return account;
        }
        public async Task<Account> DeleteAccountAsync(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return null;
            }
            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();
            return account;
        }

    }
}
