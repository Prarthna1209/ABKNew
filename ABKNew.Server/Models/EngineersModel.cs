using ABKNew.Server.Entities;
using System.ComponentModel.DataAnnotations;

namespace ABKNew.Server.Models
{
    public class EngineersModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        [MaxLength(20)]
        public string? Fax { get; set; }

        [MaxLength(20)]
        public string? Website { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Zipcode { get; set; }

        public string? BasicSteps { get; set; }
        public int? SalespersonId { get; set; }
        public string? Comment { get; set; }
        public DateTime? Created_at { get; set; } = DateTime.Now;
        public Users? SalesPerson { get; set; }
    }
}
