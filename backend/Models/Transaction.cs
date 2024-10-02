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
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int AccountId { get; set; }
        public int CategoryId { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public string Description { get; set; }

        public Account Account { get; set; }
        public Category Category { get; set; }

    }

    public class CsvFile
    {
        public string AccountName { get; set; }
        public DateTime TransactionDate  { get; set; }
        public string Description  { get; set; }
        public decimal Amount { get; set; }
    }
}