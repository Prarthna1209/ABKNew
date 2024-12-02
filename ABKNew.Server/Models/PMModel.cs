using ABKNew.Server.Entities;

namespace ABKNew.Server.Models
{
    public class PMModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int ContractorId { get; set; }
        public Contractors? Contractor { get; set; }
    }
}
