namespace ABKNew.Server.Entities
{
    public class Worksheets
    {
        public string Id { get; set; }
        public string TakeoffId { get; set; }
        public string Multiplier { get; set; }
        public string ManufacturerId { get; set; }
        public string Freight { get; set; }
        public string QuoteAmount { get; set; }
        public string TlpMultiplier { get; set; }
        public string? Comments { get; set; }
        public string? JobSpecificNotes { get; set; }
        public string CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public Manufacturers? Manufacturers { get; set; }
        public Takeoff? Takeoff { get; set; }
    }
}
