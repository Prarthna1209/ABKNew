namespace ABKNew.Server.Models
{
    public class ManufacturersModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public float? TLP { get; set; } = float.MinValue;
        public float? TTL { get; set; } = float.MinValue;
        public bool? IsFeatured { get; set; } = false;
        public string? Created_by { get; set; } = "1";
        public string? Updated_at { get; set; }
        public DateTime? Created_at { get; set; } = DateTime.Now;
    }
}
