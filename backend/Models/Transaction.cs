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
        [Required]
        public int AccountId { get; set; }
        [Required]
        public int CategoryId { get; set; }
        [Required]
        public decimal Amount { get; set; }
        [Required]
        public DateTime TransactionDate { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public Account Account { get; set; }
        [Required]
        public Category Category { get; set; }

    }

    public class CsvFile
    {
        [Required]
        public string AccountName { get; set; }
        [Required]
        public DateTime TransactionDate  { get; set; }
        [Required]
        public string Description  { get; set; }
        [Required]
        public decimal Amount { get; set; }
    }

}