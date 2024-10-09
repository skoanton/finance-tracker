using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using backend.Services;
using backend.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        private readonly ICategoryService _categoryService;
        private readonly IAccountService _accountService;
        public TransactionController(ITransactionService transactionService, ICategoryService categoryService, IAccountService accountService)
        {
            _transactionService = transactionService;
            _categoryService = categoryService;
            _accountService = accountService;

        }

        [HttpGet]
        public async Task<IActionResult> GetAllTransactions()
        {
            var transactions = await _transactionService.GetAllTransactionsAsync();
            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransactionById(int id)
        {
            var transaction = await _transactionService.GetTransactionByIdAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }
            return Ok(transaction);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateTransaction([FromBody] List<CsvFile> transactions)
        {
            var categories = await _categoryService.GetAllCategoriesAsync();
            var accounts = await _accountService.GetAllAccountsAsync();
            var results = new List<object>();
            var account = accounts.FirstOrDefault(account => account.Name == transactions.First().AccountName);

            if (account == null)
            {
                results.Add(new
                {
                    Status = "No account found",
                    Message = "Account not found, create one",
                    AccountName = new String(transactions.First().AccountName)
                });
                return Ok(results);
            }

            foreach (var transaction in transactions)
            {
                Console.WriteLine("Inside transaction");
                var categoriesFoundWithDescription = categories.Where(category => category.Description.Contains(transaction.Description)).ToList();
                Category? category = null;

                

                if (categoriesFoundWithDescription.Count == 1)
                {
                    category = categoriesFoundWithDescription[0];
                }
                else if (categoriesFoundWithDescription.Count > 1)
                {
                    results.Add(new
                    {
                        Status = "Multiple Categories Found",
                        Message = "Multiple categories found with the same description, choose one",
                        Transaction = transaction,
                        Categories = categoriesFoundWithDescription
                    });
                    continue;
                }
                else
                {
                    results.Add(new
                    {
                        Status = "No Category Found",
                        Message = "Category not found, Choose one",
                        Transaction = transaction
                        
                    });
                    continue;
                }

               

                if (account != null && category != null)
                {
                    var newTransaction = new Transaction
                    {
                        Amount = transaction.Amount,
                        TransactionDate = transaction.TransactionDate,
                        Description = transaction.Description,
                        Account = account,
                        Category = category,
                        AccountId = account.Id,
                        CategoryId = category.Id 
                    };

                    await _transactionService.CreateTransactionAsync(newTransaction);
                    results.Add(new
                    {
                        Status = "Success",
                        Message = "Transaction created successfully",
                        Transaction = newTransaction
                    });
                    
                        account.Balance += newTransaction.Amount;

                }

                else
                {
                    Console.WriteLine("No transaction created");
                }

            }
            {
                results.Add(new
                {
                    Status = "All Categories",
                    Messeage = "All available categories",
                    AllCategories = categories

                });
            }
                return Ok(results);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction(int id, Transaction updatedTransaction)
        {
            var transaction = await _transactionService.UpdateTransactionAsync(id, updatedTransaction);
            if (transaction == null)
            {
                return NotFound();
            }

            return Ok(transaction);
        }

        [HttpDelete("{id}")]
        public async  Task<IActionResult> DeleteTransaction(int id)
        {
            var transaction = await _transactionService.DeleteTransactionAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }
            return Ok(transaction);
        }

        [HttpGet("summaryMonth")]
        public async Task<ActionResult<List<CategorySummary>>> GetTransactionsThisMonth(DateTime startDate, DateTime endDate, CategoryType type)
        {
            var transactions = await _transactionService.GetMonthlyCategorySumsAsync(startDate, endDate,type);
            return Ok(transactions);
        }

        [HttpGet("lastTen")]
        public async Task<ActionResult<List<Transaction>>> GetLastTenTransactions()
        {
            var transactions = await _transactionService.GetLastTenTransactions();
            return Ok(transactions);
        }
    }
}