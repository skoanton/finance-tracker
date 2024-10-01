using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using server.Data;
using System.Threading.Tasks;
using server.Models;


namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AccountsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllAccounts()
        {
            var accounts = _context.Accounts.ToList();
            return Ok(accounts);
        }

        [HttpGet("{id}")]
        public IActionResult GetAccountById(int id)
        {
            var account = _context.Accounts.Find(id);

            if (account == null)
            {
                return NotFound();
            }
            return Ok(account);
        }

        [HttpPost]

        public IActionResult CreateAccount(Account account)
        {
            _context.Accounts.Add(account);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetAccountById), new { id = account.Id }, account);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateAccount(int id, Account updatedAccount)
        {
            var account = _context.Accounts.Find(id);
            if (account == null)
            {
                return NotFound();
            }

            account.Name = updatedAccount.Name;
            account.Type = updatedAccount.Type;
            account.Balance = updatedAccount.Balance;

            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAccount(int id)
        {
            var account = _context.Accounts.Find(id);

            if (account == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(account);
            _context.SaveChanges();
            return NoContent();
        }

    }
}