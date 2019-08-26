using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BUOnboardingTask.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

         [Required]
        [StringLength(255)]
        public string Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
