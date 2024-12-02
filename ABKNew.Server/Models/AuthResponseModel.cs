namespace ABKNew.Server.Models
{
    public class AuthResponseModel
    {
        public string? Token { get; set; }  = string.Empty;
        public bool IsSuccess { get; set; }
        public string? Message { get; set; }
    }
}
