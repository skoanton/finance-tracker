using backend.Models;
using Microsoft.EntityFrameworkCore;
using server.Data;

namespace backend.Services
{
    public interface IBudgetCategoryService
    {
        public Task<BudgetCategory> CreateBudgetCategoryAsync(BudgetCategory budgetCategory);
        public Task<List<BudgetCategory>> GetAllBudgetCategoriesAsync();
        public Task<BudgetCategory> GetBudgetCategoryByIdAsync(int id);
        public Task<BudgetCategory> UpdateBudgetCategoryAsync(int id, BudgetCategory updatedBudgetCategory);
        public Task<BudgetCategory> DeleteBudgetCategoryAsync(int id);
  
    }
    public class BudgetCategoryService : IBudgetCategoryService
    {
        private readonly ApplicationDbContext _context;
        public BudgetCategoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<BudgetCategory>> GetAllBudgetCategoriesAsync()
        {
            return await _context.BudgetCategories.ToListAsync();
        }
        public async Task<BudgetCategory> GetBudgetCategoryByIdAsync(int id)
        {
            return await _context.BudgetCategories.FindAsync(id);
        }
        public async Task<BudgetCategory> CreateBudgetCategoryAsync(BudgetCategory budgetCategory)
        {
            _context.BudgetCategories.Add(budgetCategory);
            await _context.SaveChangesAsync();
            return budgetCategory;
        }
        public async Task<BudgetCategory> UpdateBudgetCategoryAsync(int id, BudgetCategory updatedBudgetCategory)
        {
            var budgetCategory = await _context.BudgetCategories.FindAsync(id);
            if (budgetCategory == null)
            {
                return null;
            }
            budgetCategory.CategoryId = updatedBudgetCategory.CategoryId;
            budgetCategory.Amount = updatedBudgetCategory.Amount;
            _context.BudgetCategories.Update(budgetCategory); // Explicitly update
            await _context.SaveChangesAsync(); // Missing this line
            return budgetCategory;

        }
        public async Task<BudgetCategory> DeleteBudgetCategoryAsync(int id)
        {
            var budgetCategory = await _context.BudgetCategories.FindAsync(id);
            if (budgetCategory == null)
            {
                return null;
            }
            _context.BudgetCategories.Remove(budgetCategory);
            await _context.SaveChangesAsync();
            return budgetCategory;
        }
    }
}
