using server.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class BudgetCategory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        // Foreign key for the Budget
        [ForeignKey("Budget")]
        public int BudgetId { get; set; }

        // Navigation properties
        public Category? Category { get; set; }

        [JsonIgnore]  // Prevents circular reference issues when serializing JSON
        public Budget? Budget { get; set; }
    }
}
