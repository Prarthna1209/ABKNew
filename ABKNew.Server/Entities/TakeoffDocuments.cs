namespace ABKNew.Server.Entities
{
    public class TakeoffDocuments
    {
        public string Id { get; set; }
        public string? TakeoffId { get; set; }
        public string? File {  get; set; }
        public string? Type { get; set; }
        public string? UploadedBy { get; set; }
        public bool? IsVibro {  get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
