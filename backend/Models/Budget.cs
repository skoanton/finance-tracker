using server.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Drawing;

namespace backend.Models
{
    public class Budget
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public decimal TotalBudget { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }  // New field for activation status

        // One-to-many relationship with BudgetCategory
        public List<BudgetCategory> BudgetCategories { get; set; } = new List<BudgetCategory>();  // Initialize as an empty list
    }

    public class BudgetChartData
    {
        public string Category { get; set; }
        public decimal CategorySum { get; set; }
        public decimal BudgetSum { get; set; }
        public string Color { get; set; }
    }

}
