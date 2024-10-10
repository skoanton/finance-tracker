using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using server.Data;
using System.Threading.Tasks;
using server.Models;
using backend.Services;
using backend.Models;


namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService _context;

        public AccountsController(IAccountService accountService)
        {
            _context = accountService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAccounts()
        {
            var accounts = await _context.GetAllAccountsAsync();
            return Ok(accounts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccountById(int id)
        {
            var account = await _context.GetAccountByIdAsync(id);

            if (account == null)
            {
                return NotFound();
            }
            return Ok(account);
        }

        [HttpPost("create")]

        public async Task<IActionResult> CreateAccount(Account account)
        {
            var createdAccount = await _context.CreateAccountAsync(account);
            return CreatedAtAction(nameof(GetAccountById), new { id = createdAccount.Id }, createdAccount);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAccount(int id, Account updatedAccount)
        {
            var account = await _context.UpdateAccountAsync(id, updatedAccount);
            if (account == null)
            {
                return NotFound();
            }
            return Ok(account);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            var account = await _context.DeleteAccountAsync(id);

            if (account == null)
            {
                return NotFound();
            }
            return Ok(account);
        }

        [HttpGet("balance/week")]
        public async Task<ActionResult<List<AccountsBalanceSummary>>> GetAccountsBalancePastWeek()
        {
            var accounts = await _context.GetAccountsBalancePastWeekAsync();
            return Ok(accounts);
        }
        [HttpGet("balance/month")]
        public async Task<ActionResult<List<AccountsBalanceSummary>>> GetAccountsBalancePastMonth()
        {
            var accounts = await _context.GetAccountsBalancePastMonthAsync();
            return Ok(accounts);
        }
        [HttpGet("balance/year")]
        public async Task<ActionResult<List<AccountsBalanceSummary>>> GetAccountsBalancePastYear()
        {
            var accounts = await _context.GetAccountsBalancePastYearAsync();
            return Ok(accounts);
        }


    }
}