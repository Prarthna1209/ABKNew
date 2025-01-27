namespace ABKNew.Server.Models
{
    public class WorkbookNotesWorksheet
    {
        public string Id { get; set; }
        public string WorksheetId { get; set; } = "";
        public string WorksheetNoteId { get; set; } = "";
        public DateTime? UpdatedAt { get; set; } = DateTime.MinValue;
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
    }
}
