using ABKNew.Server.Entities;

namespace ABKNew.Server.Models
{
    public class WorksheetsModel
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
        public List<WorkbookNotesWorksheet> NotesWorksheets { get; set; } = new List<WorkbookNotesWorksheet>();
        public List<PDNIWorksheet> PDNIWorksheets { get; set; } = new List<PDNIWorksheet>();
        public List<WorksheetItems> WorksheetItems {  get; set; } = new List<WorksheetItems>(); 

    }
}
