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
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return category;
        }

    }


    
}
