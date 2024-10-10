using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Models
{
    public class AccountsBalanceSummary
    {
        [Required]
        public string Interval { get; set; }
        [Required]
        public decimal Balance { get; set; }
        
    }
}
