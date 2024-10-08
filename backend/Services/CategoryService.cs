using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace backend.Services
{
    public interface ICategoryService
    {
        Task<Category> CreateCategoryAsync(Category category);
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(int id);
        Task<Category> GetCategoryByNameAsync(string name);
        Task<Category> UpdateCategoryAsync(int id, Category updatedCategory);
        Task<Category> DeleteCategoryAsync(int id);
        Task<Category> GetOrCreateUncategorized();
        Task<Category> GetCategoryByTypeAsync(CategoryType type); // New method for getting a category by type
    }
    public class CategoryService : ICategoryService
    {

        private readonly ApplicationDbContext _context;

        public CategoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return await _context.Categories.ToListAsync();
        }
        public async Task<Category> GetCategoryByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }
        public async Task<Category> GetCategoryByNameAsync(string name)
        {
            return await _context.Categories.FirstOrDefaultAsync(c => c.Name == name);
        }
        public async Task<Category> CreateCategoryAsync(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }
        public async Task<Category> UpdateCategoryAsync(int id, Category updatedCategory)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return null;
            }
            category.Description = updatedCategory.Description;
            category.Name = updatedCategory.Name;
            category.Type = updatedCategory.Type;
            category.Color = updatedCategory.Color;

            _context.Categories.Update(category);
            await _context.SaveChangesAsync();
            return category;
        }
        public async Task<Category> DeleteCategoryAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return null;
            }
            var unCategorized = await GetOrCreateUncategorized();
            var transactionsToUpdate = await _context.Transactions.Where(t => t.CategoryId == category.Id).ToListAsync();

            foreach (var transaction in transactionsToUpdate)
            {
                transaction.CategoryId = unCategorized.Id;
            }
  
           
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<Category> GetOrCreateUncategorized()
        {
            var uncategorized = await _context.Categories.FirstOrDefaultAsync(c => c.Name == "Uncategorized");
            if (uncategorized == null)
            {
                uncategorized = new Category
                {
                    Name = "Uncategorized",
                    Description = ["Uncategorized"],
                    Type = CategoryType.Uncategorized,
                    Color = "#000000"
                };
                await CreateCategoryAsync(uncategorized);
            }
            return uncategorized;
        }

        public async Task<Category> GetCategoryByTypeAsync(CategoryType type)
        {
            return await _context.Categories.FirstOrDefaultAsync(c => c.Type == type);
        }

    }


    
}
