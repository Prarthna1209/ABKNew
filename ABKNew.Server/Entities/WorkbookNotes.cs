namespace ABKNew.Server.Entities
{
    public class WorkbookNotes
    {
        public string Id { get; set; }
        public string Note { get; set; } = "";
        public string? Created_by { get; set; } = "1";
        public string? Updated_at { get; set; }
        public DateTime? Created_at { get; set; } = DateTime.Now;
    }
}
