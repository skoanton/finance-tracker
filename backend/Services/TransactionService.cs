using backend.Models;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace backend.Services
{
    public interface ITransactionService
    {
        Task<IEnumerable<Transaction>> GetAllTransactionsAsync();
        Task<Transaction> GetTransactionByIdAsync(int id);
        Task<Transaction> CreateTransactionAsync(Transaction transactions);
        Task<Transaction> UpdateTransactionAsync(int id, Transaction updatedTransaction);
        Task<Transaction> DeleteTransactionAsync(int id);
        Task<Transaction> GetTransactionsThisMonthAsync();
        Task<List<CategorySummary>> GetMonthlyCategorySumsAsync(DateTime startDate, DateTime endDate, CategoryType type);
        Task<List<Transaction>> GetLastTenTransactions();
    }
    public class TransactionService : ITransactionService
    {
        private readonly ApplicationDbContext _context;

        public TransactionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Transaction>> GetAllTransactionsAsync()
        {
            return await _context.Transactions
                .Include(t => t.Account)
                .Include(t => t.Category)
                .ToListAsync();
        }
        public async Task<Transaction> GetTransactionByIdAsync(int id)
        {
            return await _context.Transactions
         .Include(t => t.Account)
         .Include(t => t.Category)
         .FirstOrDefaultAsync(t => t.Id == id);
        }
        public async Task<Transaction> CreateTransactionAsync(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }
        public async Task<Transaction> UpdateTransactionAsync(int id, Transaction updatedTransaction)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            
            if (transaction == null)
            {
                Console.WriteLine("Transaction not found");
                return null;
            }
            Console.WriteLine($"Updating Transaction ID: {transaction.Id}");
            var category = await _context.Categories.FindAsync(updatedTransaction.CategoryId);
            if (category != null) {
                category.Description.Add(updatedTransaction.Description);
            }

            transaction.Amount = updatedTransaction.Amount;
            transaction.TransactionDate = updatedTransaction.TransactionDate;
            transaction.Description = updatedTransaction.Description;
            transaction.CategoryId = updatedTransaction.CategoryId;
            transaction.AccountId = updatedTransaction.AccountId;
            Console.WriteLine($"Transaction state: {_context.Entry(transaction).State}");
            Console.WriteLine($"Category state: {_context.Entry(category).State}");
            _context.Transactions.Update(transaction);

            try
            {
                await _context.SaveChangesAsync();
                Console.WriteLine("Transaction updated successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating transaction: {ex.Message}");
            }
            return await _context.Transactions
        .Include(t => t.Account)
        .Include(t => t.Category)
        .FirstOrDefaultAsync(t => t.Id == id);
        }
        public async Task<Transaction> DeleteTransactionAsync(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return null;
            }
            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }

        public async Task<Transaction> GetTransactionsThisMonthAsync()
        {
            var today = DateTime.Today;
            var firstDayOfMonth = new DateTime(today.Year, today.Month, 1);
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

            return await _context.Transactions
                .Where(t => t.TransactionDate >= firstDayOfMonth && t.TransactionDate <= lastDayOfMonth)
                .Include(t => t.Account)
                .Include(t => t.Category)
                .FirstOrDefaultAsync();

        }

        public async Task<List<CategorySummary>> GetMonthlyCategorySumsAsync(DateTime startDate, DateTime endDate, CategoryType type )
        {

            return await _context.Transactions
                .Where(t => t.TransactionDate >= startDate && t.TransactionDate <= endDate)
                .Include(t => t.Category).Where(t => t.Category.Type == type)
                .GroupBy(t => t.CategoryId)
                .Select(g => new CategorySummary
                {
                    Id = g.Key,
                    Name = g.First().Category.Name,
                    Amount = Math.Abs(g.Sum(t => t.Amount)),
                    Color = g.First().Category.Color
                })
                .ToListAsync();
        }

        public async Task<List<Transaction>> GetLastTenTransactions()
        {
            return await _context.Transactions
                .Include(t => t.Account)
                .Include(t => t.Category)
                .OrderByDescending(t => t.TransactionDate)
                .Take(10)
                .ToListAsync();
        }
    }
}
