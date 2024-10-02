﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using backend.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        private readonly ICategoryService _categoryService;
        private readonly IAccountService _accountService;
        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
            _categoryService = _categoryService;
            _accountService = _accountService;

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
        public async Task<IActionResult> CreateTransaction(List<CsvFile> transactions)
        {
            var categories = await _categoryService.GetAllCategoriesAsync();
            var accounts = await _accountService.GetAllAccountsAsync();
            var results = new List<object>();
            foreach (var transaction in transactions)
            {
                var categoryId = -1;
                var categoriesFoundWithDescription = new List<Category>();
                var accountId = 0;
                foreach (var category in categories)
                {
                    if (category.Description.Contains(transaction.Description))
                    {
                        categoriesFoundWithDescription.Add(category);
                    }

                }

                if (categoriesFoundWithDescription.Count == 1)
                {
                    categoryId = categoriesFoundWithDescription[0].Id;
                }
                else if (categoriesFoundWithDescription.Count > 1)
                {
                    results.Add(new
                    {
                        Status = "Error",
                        Message = "Multiple categories found with the same description, choose one",
                        Transaction = transaction
                    });
                    continue;
                }
                else
                {
                    results.Add(new
                    {
                        Status = "Error",
                        Message = "Category not found, create one",
                        Transaction = transaction
                    });
                    continue;
                }

                var account = accounts.FirstOrDefault(account => account.Name == transaction.AccountName);


                if (account == null)
                {
                    results.Add(new
                    {
                        Status = "Error",
                        Message = "Account not found, create one",
                        Transaction = transaction
                    });
                    continue;
                }

                else
                {
                    accountId = account.Id;
                }

                if (accountId != -1)
                {
                    var newTransaction = new Transaction
                    {
                        Amount = transaction.Amount,
                        TransactionDate = transaction.TransactionDate,
                        Description = transaction.Description,
                        CategoryId = categoryId,
                        AccountId = accountId
                    };

                    await _transactionService.CreateTransactionAsync(newTransaction);
                    results.Add(new
                    {
                        Status = "Success",
                        Message = "Transaction created successfully",
                        Transaction = newTransaction
                    });
                }

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
    }
}