namespace ABKNew.Server.Entities
{
    public class Documents
    {
        public string Id { get; set; }
        public string Section { get; set; }
        public string Type { get; set; }
        public string FileName { get; set; }
        public byte[] Data { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string SectionId { get; set; }
    }
}
