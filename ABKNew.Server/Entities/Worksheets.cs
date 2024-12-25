namespace ABKNew.Server.Entities
{
    public class Worksheets
    {
        public string Id { get; set; }
        public string Takeoff_Id { get; set; }
        public string Multiplier { get; set; }
        public string Manufacturer_Id { get; set; }
        public string Freight { get; set; }
        public string Quote_amount { get; set; }
        public string Tlp_multiplier { get; set; }
        public string? Comments { get; set; }
        public string? Job_specific_notes { get; set; }
        public string Created_by { get; set; }
        public string? Updated_by { get; set; }
        public DateTime Created_at { get; set; } = DateTime.Now;
        public Manufacturers? Manufacturers { get; set; }
        //public TakeOff
    }
}
