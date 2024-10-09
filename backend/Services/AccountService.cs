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

            // Fetch all accounts
            var accounts = await _context.Accounts.ToListAsync();

            var allAccountsBalanceSummary = new List<AccountsBalanceSummary>();

            foreach (var account in accounts)
            {
                // Step 1: Get the current balance for the account (total sum of all transactions for the account)
                decimal currentBalance = account.Balance;

                // Step 2: Get the transactions for the current week (we will subtract these from the current balance)
                var weeklyTransactions = await _context.Transactions
                    .Where(t => t.AccountId == account.Id && t.TransactionDate >= startDate && t.TransactionDate <= currentDate)
                    .GroupBy(t => t.TransactionDate.DayOfWeek) // Group by DayOfWeek
                    .Select(g => new
                    {
                        DayOfWeek = g.Key,
                        Sum = g.Sum(t => t.Amount) // Sum the transactions for that day
                    })
                    .ToListAsync();

                // Step 3: Create a list of days from Monday to today
                var daysOfWeek = Enum.GetValues(typeof(DayOfWeek))
                    .Cast<DayOfWeek>()
                    .Where(d => d >= DayOfWeek.Monday && d <= currentDate.DayOfWeek)
                    .ToList();

                // Step 4: Iterate through the days in reverse to subtract the transactions and calculate the running balance
                decimal runningBalance = currentBalance;

                foreach (var day in daysOfWeek.OrderByDescending(d => d))
                {
                    var transactionForDay = weeklyTransactions.FirstOrDefault(wt => wt.DayOfWeek == day);

                    // Subtract the transaction for the current day from the running balance
                    if (transactionForDay != null)
                    {
                        runningBalance -= transactionForDay.Sum;
                    }

                    // Add the balance for this day to the result
                    allAccountsBalanceSummary.Add(new AccountsBalanceSummary
                    {
                        Interval = day.ToString(),
                        Balance = runningBalance
                    });
                }
            }

            // Sort the final list by DayOfWeek to maintain correct order (Monday to today)
            allAccountsBalanceSummary = allAccountsBalanceSummary
                .OrderBy(a => (DayOfWeek)Enum.Parse(typeof(DayOfWeek), a.Interval))
                .ToList();

            return allAccountsBalanceSummary;
        }

        public async Task<List<AccountsBalanceSummary>> GetAccountsBalancePastMonthAsync()
        {
            var currentDate = DateTime.Now;

            // Set the start of the current month (1st day of the current month)
            var startDate = new DateTime(currentDate.Year, currentDate.Month, 1);

            // Fetch all accounts
            var accounts = await _context.Accounts.ToListAsync();

            var allAccountsBalanceSummary = new List<AccountsBalanceSummary>();

            foreach (var account in accounts)
            {
                // Step 1: Get the current balance for the account (total sum of all transactions for the account)
                decimal currentBalance = account.Balance;

                // Step 2: Get the transactions for the current month (we will subtract these from the current balance)
                var monthlyTransactions = await _context.Transactions
                    .Where(t => t.AccountId == account.Id && t.TransactionDate >= startDate && t.TransactionDate <= currentDate)
                    .GroupBy(t => t.TransactionDate.Day) // Group by Day of the month
                    .Select(g => new
                    {
                        DayOfMonth = g.Key,
                        Sum = g.Sum(t => t.Amount) // Sum the transactions for that day
                    })
                    .ToListAsync();

                // Step 3: Create a list of days from the 1st to today
                var daysInCurrentMonth = Enumerable.Range(1, currentDate.Day).ToList();

                // Step 4: Iterate through the days in reverse to subtract the transactions and calculate the running balance
                decimal runningBalance = currentBalance;

                foreach (var day in daysInCurrentMonth.OrderByDescending(d => d))
                {
                    var transactionForDay = monthlyTransactions.FirstOrDefault(mt => mt.DayOfMonth == day);

                    // Subtract the transaction for the current day from the running balance
                    if (transactionForDay != null)
                    {
                        runningBalance -= transactionForDay.Sum;
                    }

                    // Add the balance for this day to the result
                    allAccountsBalanceSummary.Add(new AccountsBalanceSummary
                    {
                        Interval = day.ToString(),
                        Balance = runningBalance,
                    });
                }
            }

            // Sort the final list by Day of the month to maintain correct order (1st to today)
            allAccountsBalanceSummary = allAccountsBalanceSummary
                .OrderBy(a => int.Parse(a.Interval))
                .ToList();

            return allAccountsBalanceSummary;
        }
        public async Task<List<AccountsBalanceSummary>> GetAccountsBalancePastYearAsync()
        {
            var currentDate = DateTime.Now;

            // Set the start date to the beginning of the range (e.g., 10 years ago)
            var startDate = currentDate.AddYears(-10);

            // Fetch all accounts
            var accounts = await _context.Accounts.ToListAsync();

            var allAccountsBalanceSummary = new List<AccountsBalanceSummary>();

            foreach (var account in accounts)
            {
                // Step 1: Get the current balance for the account (total sum of all transactions for the account)
                decimal currentBalance = account.Balance;

                // Step 2: Get the transactions for the past years (grouped by year)
                var yearlyTransactions = await _context.Transactions
                    .Where(t => t.AccountId == account.Id && t.TransactionDate >= startDate && t.TransactionDate <= currentDate)
                    .GroupBy(t => t.TransactionDate.Year) // Group by Year
                    .Select(g => new
                    {
                        Year = g.Key,
                        Sum = g.Sum(t => t.Amount) // Sum of transactions for that year
                    })
                    .ToListAsync();

                // Step 3: Create a list of years from the starting year to the current year
                var yearsInRange = Enumerable.Range(startDate.Year, currentDate.Year - startDate.Year + 1).ToList();

                // Step 4: Iterate through the years in reverse to subtract the transactions and calculate the running balance
                decimal runningBalance = currentBalance;

                foreach (var year in yearsInRange.OrderByDescending(y => y))
                {
                    var transactionForYear = yearlyTransactions.FirstOrDefault(yt => yt.Year == year);

                    // Subtract the transaction for the current year from the running balance
                    if (transactionForYear != null)
                    {
                        runningBalance -= transactionForYear.Sum;
                    }

                    // Add the balance for this year to the result
                    allAccountsBalanceSummary.Add(new AccountsBalanceSummary
                    {
                        Interval = year.ToString(),
                        Balance = runningBalance,
                    });
                }
            }

            // Sort the final list by Year to maintain correct order (Oldest to newest)
            allAccountsBalanceSummary = allAccountsBalanceSummary
                .OrderBy(a => int.Parse(a.Interval))
                .ToList();

            return allAccountsBalanceSummary;
        }
    }
}
