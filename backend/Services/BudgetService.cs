using backend.Models;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Query.Internal;
using server.Data;

namespace backend.Services
{
    public interface IBudgetService
    {
        public Task<Budget> CreateBudgetAsync(Budget budget);
        public Task<List<Budget>> GetAllBudgetsAsync();
        public Task<Budget> GetBudgetByIdAsync(int id);
        public Task<Budget> UpdateBudgetAsync(int id, Budget updatedBudget);
        public Task<Budget> DeleteBudgetAsync(int id);
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
            budget.TotalBudget = updatedBudget.TotalBudget;
            budget.BudgetCategories = updatedBudget.BudgetCategories;
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
