namespace ABKNew.Server.Entities
{
    public class Engineering
    {
        public string Id { get; set; }
        public string JobName { get; set; }
        public string JobAddress { get; set; }
        public string EngineerId { get; set; }
        public string SalesmanId { get; set; }
        public string UserId { get; set;}
        public string ProjectNumber { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public string? ModelNumber { get; set; }
        public string? Comment { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.MinValue;

    }
}
