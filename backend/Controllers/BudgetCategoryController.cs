using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BudgetCategoryController : ControllerBase
    {
        private readonly IBudgetCategoryService _budgetCategoryService;

        public BudgetCategoryController(IBudgetCategoryService budgetCategoryService)
        {
            _budgetCategoryService = budgetCategoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBudgetCategories()
        {
            var budgetCategories = await _budgetCategoryService.GetAllBudgetCategoriesAsync();
            return Ok(budgetCategories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBudgetCategoryById(int id)
        {
            var budgetCategory = await _budgetCategoryService.GetBudgetCategoryByIdAsync(id);
            if (budgetCategory == null)
            {
                return NotFound();
            }
            return Ok(budgetCategory);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBudgetCategory([FromBody] BudgetCategory budgetCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdBudgetCategory = await _budgetCategoryService.CreateBudgetCategoryAsync(budgetCategory);
            return CreatedAtAction(nameof(GetBudgetCategoryById), new { id = createdBudgetCategory.Id }, createdBudgetCategory);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBudgetCategory(int id, [FromBody] BudgetCategory updatedBudgetCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var budgetCategory = await _budgetCategoryService.UpdateBudgetCategoryAsync(id, updatedBudgetCategory);
            if (budgetCategory == null)
            {
                return NotFound();
            }
            return Ok(budgetCategory);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBudgetCategory(int id)
        {
            var budgetCategory = await _budgetCategoryService.DeleteBudgetCategoryAsync(id);
            if (budgetCategory == null)
            {
                return NotFound();
            }
            return Ok(budgetCategory);
        }


    }
}
