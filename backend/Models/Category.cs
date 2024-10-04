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
        Transfer,
        Uncategorized
    }
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string[] Description { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public CategoryType Type { get; set; }
        [Required]
        public string Color { get; set; }
    }
}