using backend.Models;
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
        Task<List<AccountsBalanceSummary>> GetAccountsBalancePastWeekAsync();
        Task<List<AccountsBalanceSummary>> GetAccountsBalancePastMonthAsync();
        Task<List<AccountsBalanceSummary>> GetAccountsBalancePastYearAsync();

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
        public async Task<List<AccountsBalanceSummary>> GetAccountsBalancePastWeekAsync()
        {
            var currentDate = DateTime.Now;

            // Calculate the start of the current week (Monday)
            var startDate = currentDate.AddDays(-(int)currentDate.DayOfWeek + (int)DayOfWeek.Monday);

            // Get the total balance up to the current date (current balance across all transactions)
            decimal totalBalance = await _context.Transactions
                .Where(t => t.TransactionDate <= currentDate)
                .SumAsync(t => t.Amount);

            // Get the transactions for the current week grouped by day of the week
            var accountsBalance = await _context.Transactions
                .Where(t => t.TransactionDate >= startDate && t.TransactionDate <= currentDate)
                .GroupBy(t => t.TransactionDate.DayOfWeek) // Group by DayOfWeek
                .Select(g => new AccountsBalanceSummary
                {
                    Interval = g.Key.ToString(), // Use DayOfWeek as Interval
                    Balance = g.Sum(t => t.Amount) // Sum the balance for all accounts on that day
                })
                .ToListAsync();

            // Create a list of days from Monday to today
            var daysOfWeek = Enum.GetValues(typeof(DayOfWeek))
                .Cast<DayOfWeek>()
                .Where(d => d >= DayOfWeek.Monday && d <= currentDate.DayOfWeek)
                .ToList();

            // Sort the transactions to process them in the correct order
            accountsBalance = accountsBalance
                .OrderBy(a => (DayOfWeek)Enum.Parse(typeof(DayOfWeek), a.Interval))
                .ToList();

            // Add missing days with a running balance
            decimal runningBalance = totalBalance;
            foreach (var day in daysOfWeek)
            {
                var existingEntry = accountsBalance.FirstOrDefault(a => a.Interval == day.ToString());
                if (existingEntry == null)
                {
                    // No transactions for this day, use the running balance from the previous day
                    accountsBalance.Add(new AccountsBalanceSummary
                    {
                        Interval = day.ToString(),
                        Balance = runningBalance
                    });
                }
                else
                {
                    // If transactions exist for the day, update the running balance
                    runningBalance += existingEntry.Balance;
                    existingEntry.Balance = runningBalance;
                }
            }

            // Sort the final list by DayOfWeek to maintain correct order (Monday to today)
            accountsBalance = accountsBalance
                .OrderBy(a => (DayOfWeek)Enum.Parse(typeof(DayOfWeek), a.Interval))
                .ToList();

            return accountsBalance;
        }

        public async Task<List<AccountsBalanceSummary>> GetAccountsBalancePastMonthAsync()
        {
            var currentDate = DateTime.Now;

            // Set the start of the current month (1st day of the current month)
            var startDate = new DateTime(currentDate.Year, currentDate.Month, 1);

            // Get the total balance up to the current date
            decimal totalBalance = await _context.Transactions
                .Where(t => t.TransactionDate <= currentDate)
                .SumAsync(t => t.Amount);

            // Get the transactions for the current month, grouped by day
            var accountsBalance = await _context.Transactions
                .Where(t => t.TransactionDate >= startDate && t.TransactionDate <= currentDate)
                .GroupBy(t => t.TransactionDate.Day) // Group by Day of the month
                .Select(g => new AccountsBalanceSummary
                {
                    Interval = g.Key.ToString(), // Use Day as Interval
                    Balance = g.Sum(t => t.Amount) // Sum the balance for all accounts on that day
                })
                .ToListAsync();

            // Create a list of all days in the current month up to today
            var daysInCurrentMonth = Enumerable.Range(1, currentDate.Day).ToList();

            // Sort the transactions to process them by day in ascending order
            accountsBalance = accountsBalance.OrderBy(a => int.Parse(a.Interval)).ToList();

            // Add missing days and carry forward the running balance
            decimal runningBalance = totalBalance;
            foreach (var day in daysInCurrentMonth)
            {
                var existingEntry = accountsBalance.FirstOrDefault(a => int.Parse(a.Interval) == day);
                if (existingEntry == null)
                {
                    // If no transactions exist for this day, use the running balance from the previous day
                    accountsBalance.Add(new AccountsBalanceSummary
                    {
                        Interval = day.ToString(),
                        Balance = runningBalance
                    });
                }
                else
                {
                    // If transactions exist for the day, update the running balance
                    runningBalance += existingEntry.Balance;
                    existingEntry.Balance = runningBalance;
                }
            }

            // Sort the final list by day to maintain correct order
            accountsBalance = accountsBalance.OrderBy(a => int.Parse(a.Interval)).ToList();

            return accountsBalance;
        }
        public async Task<List<AccountsBalanceSummary>> GetAccountsBalancePastYearAsync()
        {
            var currentDate = System.DateTime.Now;
            var startDate = currentDate.AddYears(-10); // Change this as needed for the number of years you want

            var accountsBalance = await _context.Transactions
                .Where(t => t.TransactionDate >= startDate && t.TransactionDate <= currentDate)
                .GroupBy(t => t.TransactionDate.Year) // Group by Year only
                .Select(g => new AccountsBalanceSummary
                {
                    Interval = g.Key.ToString(), // Use Year as Interval
                    Balance = g.Sum(t => t.Amount) // Sum the balance for all accounts
                })
                .ToListAsync();

            // Sort by Year (already an integer)
            accountsBalance = accountsBalance.OrderBy(a => int.Parse(a.Interval)).ToList();

            return accountsBalance;
        }
    }
}
