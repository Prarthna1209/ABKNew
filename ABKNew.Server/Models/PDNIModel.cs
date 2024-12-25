namespace ABKNew.Server.Models
{
    public class PDNIModel
    {
        public string Id { get; set; }
        public string Name { get; set; } = "";
        public string? Created_by { get; set; } = "1";
        public DateTime? Updated_at { get; set; } = DateTime.MinValue;
        public DateTime? Created_at { get; set; } = DateTime.Now;
    }
}
