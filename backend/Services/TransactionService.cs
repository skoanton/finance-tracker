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
            return await _context.Transactions.FindAsync(id);
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
                return null;
            }
            transaction.Amount = updatedTransaction.Amount;
            transaction.TransactionDate = updatedTransaction.TransactionDate;
            transaction.Description = updatedTransaction.Description;
            transaction.CategoryId = updatedTransaction.CategoryId;
            transaction.AccountId = updatedTransaction.AccountId;

            _context.Transactions.Update(transaction);
            await _context.SaveChangesAsync();
            return transaction;
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

    }
}
