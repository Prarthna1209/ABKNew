namespace ABKNew.Server.Entities
{
    public class EmailTemplates
    {
        public string Id { get; set; }
        public string Mailable { get; set; }
        public string Name { get; set; }
        public string Subject { get; set; }
        public string HtmlTemplate { get; set; }
        public string TextTemplate { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; } = DateTime.Now;
    }
}
