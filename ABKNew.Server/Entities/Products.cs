namespace ABKNew.Server.Entities
{
    public class Products
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Range1 { get; set; }
        public string Range2 { get; set; }
        public string Range3 { get; set; }
        public string? Comments { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; } = DateTime.MinValue;
        public string ManufacturerId { get; set; }
        public Manufacturers? Manufacturers { get; set; }
    }
}
