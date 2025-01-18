namespace ABKNew.Server.Models
{
    public class PermissionsModel
    {
        public string Id { get; set; }
        public string Name { get; set; } = "";
        public string Module { get; set; } = "1";
        public DateTime? UpdatedAt { get; set; } = DateTime.MinValue;
        public DateTime? CreatedAt { get; set; } = DateTime.Now;

    }
}
