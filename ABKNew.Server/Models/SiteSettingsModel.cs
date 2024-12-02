namespace ABKNew.Server.Models
{
    public class SiteSettingsModel
    {
        public int Id { get; set; }
        public string? DATA_MonthShow { get; set; } = "0";
        public string? DATA_QuoteShow { get; set; } = "0";
        public string? UPSAPI_AccessToken { get; set; } = "";
        public string? UPSAPI_Username { get; set; } = "";
        public string? UPSAPI_Password { get; set; } = "";
        public string? API_AccessToken { get; set; } = "";
        public string? API_ClientSecret { get; set; } = "";
        public string? Prefix_Takeoff { get; set; } = "";
        public string? Prefix_Quote { get; set; } = "";
        public string? Prefix_Job { get; set; } = "";
        public string? Prefix_Aw { get; set; } = "";
        public string? Prefix_AWF { get; set; } = "";
        public string? Prefix_SBC { get; set; } = "";
        public string? Prefix_SPL { get; set; } = "";
        public string? Prefix_J { get; set; } = "";
        public string? Prefix_Q { get; set; } = "";
        public string? SMTP_Host { get; set; } = "";
        public string? SMTP_Port { get; set; } = "";
        public string? SMTP_Security { get; set; } = "";
        public string? SMTP_Username { get; set; } = "";
        public string? SMTP_Password { get; set; } = "";
        public string? SMTP_FromEmail { get; set; } = "";
        public string? SMTP_FromName { get; set; } = "";
        public string? THEME_Current { get; set; } = "";
        public string? THEME_InvoiceTemp { get; set; } = "";
        public string? THEME_QuotePaperSize { get; set; } = "A4";
        public string? GEN_LoginLogo { get; set; } = "";
        public string? GEN_HeaderLogo { get; set; } = "";
        public string? GEN_EmailLogo { get; set; } = "";
        public string? GEN_CompanyName { get; set; } = "";
        public string? GEN_FrontWebsite { get; set; } = "";
        public string? GEN_BackendApp { get; set; } = "";
        public string? GEN_OfficeAdd { get; set; } = "";
        public string? GEN_Phone { get; set; } = "";
        public string? GEN_Fax { get; set; } = "";
        public string? GEN_Email { get; set; } = "";
        public string? GEN_Clock1Label { get; set; } = "";
        public string? GEN_Clock1Time { get; set; } = "";
        public bool? GEN_Clock1Active { get; set; } = false;
        public string? GEN_Clock2Label { get; set; } = "";
        public string? GEN_Clock2Time { get; set; } = "";
        public bool? GEN_Clock2Active { get; set; } = false;

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
