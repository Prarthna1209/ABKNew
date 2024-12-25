namespace ABKNew.Server.Models
{
    public class EmailAccountsModel
    {
        public string Id { get; set; }
        public string? Followup_Email { get; set; }
        public string? Followup_Password { get; set; }
        public string? Takeoff_Email { get; set; }
        public string? Takeoff_Password { get; set; }
        public string? BidReq_Email { get; set; }
        public string? BidReq_Password { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
