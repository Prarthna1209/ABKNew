namespace ABKNew.Server.Entities
{
    public class PDNIWorksheet
    {
        public string Id { get; set; }
        public string PdniId { get; set; }
        public string WorksheetId { get; set; }
        public DateTime? UpdatedAt { get; set; } = DateTime.MinValue;
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
    }
}
