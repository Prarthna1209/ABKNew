namespace ABKNew.Server.Entities
{
    public class Takeoff
    {
        public string Id { get; set; }
        public string? TakeoffId { get; set; }
        public string? QuoteId { get; set; }
        public string? JobId { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? DrawingDate { get; set; }
        public DateTime? RevisedDate { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? QuoteDate { get; set; }
        public string? SalesmanId { get; set; }
        public string? EngineerId { get; set; }
        public string? ContractorId { get; set; }
        public string? ArchitectId { get; set; }
        public string? SpecificationId { get; set; }
        public string? JobName { get; set; }
        public string? Jobaddress { get; set; }
        public string? Comments { get; set; }
        public string? WorksheetGenerated { get; set; }
        public string? PDFGenerated { get; set; }
        public string? Amount { get; set; }
        public string? OriginalQuote { get; set; }
        public string? QuoteEntered { get; set; }
        public string? CreatedBy { get; set; }
        public string? QuotedBy { get; set; }
        public string? QuoteComments { get; set; }
        public string? Status { get; set; }
        public string? RevActive { get; set; }
        public string? ProjectNumber { get; set; }
        public string? VibroLayIn { get; set; }
        public string? DrawingRCVDFrom { get; set; }
        public string? QuoteOut { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string? UpdatedAt { get; set; }
        public string? SubmittalDoneBy { get; set; }
        public string? QuoteRevision { get; set; }
        public string? OriginalQuoteId { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}
