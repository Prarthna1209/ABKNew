using ABKNew.Server.Entities;
using System.ComponentModel.DataAnnotations;

namespace ABKNew.Server.Models
{
    public class ContractorsModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        [MaxLength(20)]
        public string? CustomerPhone { get; set; }
        public string? OfficePhone { get; set; }

        [MaxLength(20)]
        public string? Fax { get; set; }

        [MaxLength(20)]
        public string? Website { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Zipcode { get; set; }

        public string? CompanyAddress { get; set; }
        public int SalespersonId { get; set; }
        public bool Is_active { get; set; } = false;
        public DateTime? Created_at { get; set; } = DateTime.Now;
        public Users? SalesPerson { get; set; }
    }
}
