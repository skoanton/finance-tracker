using backend.Models;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Query.Internal;
using server.Data;

namespace backend.Services
{
    public interface IBudgetService
    {
        Task<Budget> CreateBudgetAsync(Budget budget);
        Task<List<Budget>> GetAllBudgetsAsync();
        Task<Budget> GetBudgetByIdAsync(int id);
        Task<Budget> UpdateBudgetAsync(int id, Budget updatedBudget);
        Task<Budget> DeleteBudgetAsync(int id);
    }
    public class BudgetService: IBudgetService
    {
        private readonly ApplicationDbContext _context;
        public BudgetService(ApplicationDbContext context) { 
               _context = context;
        }

        public async Task<List<Budget>> GetAllBudgetsAsync()
        {
            return await _context.Budgets.ToListAsync();
        }
        public async Task<Budget> GetBudgetByIdAsync(int id)
        {
            return await _context.Budgets.FindAsync(id);
        }
        public async Task<Budget> CreateBudgetAsync(Budget budget)
        {
            _context.Budgets.Add(budget);
            await _context.SaveChangesAsync();
            return budget;
        }
        public async Task<Budget> UpdateBudgetAsync(int id, Budget updatedBudget)
        {
            var budget = await _context.Budgets.FindAsync(id);
            if (budget == null)
            {
                return null;
            }
            budget.Amount = updatedBudget.Amount;
            budget.CategoryId = updatedBudget.CategoryId;
            budget.StartDate = updatedBudget.StartDate;
            budget.EndDate = updatedBudget.EndDate;

            _context.Budgets.Update(budget);
            await _context.SaveChangesAsync();
            return budget;
        }
        public async Task<Budget> DeleteBudgetAsync(int id)
        {
            var budget = await _context.Budgets.FindAsync(id);
            if (budget == null)
            {
                return null;
            }
            _context.Budgets.Remove(budget);
            await _context.SaveChangesAsync();
            return budget;
        }

    }
}
