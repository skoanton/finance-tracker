using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using Microsoft.AspNetCore.Mvc;
using server.Data;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public TransactionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllTransactions()
        {
            var transactions = _context.Transactions.ToList();
            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public IActionResult GetTransactionById(int id)
        {
            var transaction = _context.Transactions.Find(id);

            if (transaction == null)
            {
                return NotFound();
            }
            return Ok(transaction);
        }

        [HttpPost]
        public IActionResult CreateTransaction(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetTransactionById), new { id = transaction.Id }, transaction);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTransaction(int id, Transaction updatedTransaction)
        {
            var transaction = _context.Transactions.Find(id);
            if (transaction == null)
            {
                return NotFound();
            }

            transaction.AccountId = updatedTransaction.AccountId;
            transaction.CategoryId = updatedTransaction.CategoryId;
            transaction.Amount = updatedTransaction.Amount;
            transaction.TransactionDate = updatedTransaction.TransactionDate;
            transaction.Description = updatedTransaction.Description;

            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTransaction(int id)
        {
            var transaction = _context.Transactions.Find(id);
            if (transaction == null)
            {
                return NotFound();
            }

            _context.Transactions.Remove(transaction);
            _context.SaveChanges();
            return NoContent();
        }
    }
}