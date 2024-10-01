using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Column("category_name")]
        public string Name { get; set; }
        [Column("is_Income")]
        public Boolean IsIncome { get; set; }
    }
}