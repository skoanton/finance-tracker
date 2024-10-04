using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public enum CategoryType
    {
        Income,
        Expense,
        Saving,
        Transfer
    }
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string[] Description { get; set; }
        public string Name { get; set; }
        public CategoryType Type { get; set; }
    }
}