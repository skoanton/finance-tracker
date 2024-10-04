using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class CategorySummary
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal Amount { get; set; }
        [Required]
        public string Color { get; set; }   
    }
}
