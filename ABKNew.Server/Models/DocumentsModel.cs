using ABKNew.Server.Entities;

namespace ABKNew.Server.Models
{
    public class DocumentsModel
    {
        public string Id { get; set; }
        public string Section { get; set; }
        public string Type { get; set; }
        public string FileName { get; set; }
        public IFormFile File { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string SectionId { get; set; }
    }
}
