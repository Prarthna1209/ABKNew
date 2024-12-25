namespace ABKNew.Server.Entities
{
    public class PM
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string ContractorId { get; set; }
        public Contractors? Contractor { get; set; }
    }
}
