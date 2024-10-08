﻿using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace server.Models
{
    [JsonConverter(typeof(StringEnumConverter))]
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
        public List<string> Description { get; set; } = new List<string>();
        [Required]
        public string Name { get; set; }
        [Required]
        public CategoryType Type { get; set; }
        [Required]
        public string Color { get; set; }
    }
}