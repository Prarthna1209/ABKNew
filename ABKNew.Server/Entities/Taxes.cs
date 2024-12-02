namespace ABKNew.Server.Entities
{
    public class Taxes
    {
        public int Id { get; set; }
        public float Rate { get; set; }
        public string Region { get; set; }
        public string Created_by { get; set; } = "1";
        public DateTime? Created_At { get; set; }
        public DateTime? Updated_At { get; set; }
    }
}
