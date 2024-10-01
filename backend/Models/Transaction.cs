using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }
        public string AccountId { get; set; }
        public string CategoryId { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public string Description { get; set; }

        public Account Account { get; set; }
        public Category Category { get; set; }

    }
}