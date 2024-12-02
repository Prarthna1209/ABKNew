using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace ABKNew.Server.Repositories
{
    public class SiteSettingsRepository : GenericRepository<SiteSettings>, ISiteSettingsRepository
    {
        public SiteSettingsRepository(ABKDBContext dbContext) : base(dbContext)
        {
        }

        private readonly IUserRolesRepository _userRolesRepository;
        public async Task<int> AddSiteSettings(SiteSettingsModel model)
        {
            SiteSettings item = new()
            {
                DATA_MonthShow = model.DATA_MonthShow ?? "",
                DATA_QuoteShow = model.DATA_QuoteShow ?? "",
                UPSAPI_AccessToken = model.UPSAPI_AccessToken ?? "",
                UPSAPI_Username = model.UPSAPI_Username ?? "",
                UPSAPI_Password = model.UPSAPI_Password ?? "",
                API_AccessToken = model.API_AccessToken ?? "",
                API_ClientSecret = model.API_ClientSecret ?? "",
                Prefix_Takeoff = model.Prefix_Takeoff ?? "",
                Prefix_Quote = model.Prefix_Quote ?? "",
                Prefix_Job = model.Prefix_Job ?? "",
                Prefix_Aw = model.Prefix_Aw ?? "",
                Prefix_AWF = model.Prefix_AWF ?? "",
                Prefix_SBC = model.Prefix_SBC ?? "",
                Prefix_SPL = model.Prefix_SPL ?? "",
                Prefix_J = model.Prefix_J ?? "",
                Prefix_Q = model.Prefix_Q ?? "",
                SMTP_Host = model.SMTP_Host ?? "",
                SMTP_Port = model.SMTP_Port ?? "",
                SMTP_Security = model.SMTP_Security ?? "",
                SMTP_Username = model.SMTP_Username ?? "",
                SMTP_Password = model.SMTP_Password ?? "",
                SMTP_FromEmail = model.SMTP_FromEmail ?? "",
                THEME_Current = model.THEME_Current ?? "",
                THEME_InvoiceTemp = model.THEME_InvoiceTemp ?? "",
                THEME_QuotePaperSize = model.THEME_QuotePaperSize ?? "",
                GEN_LoginLogo = model.GEN_LoginLogo ?? "",
                GEN_HeaderLogo = model.GEN_HeaderLogo ?? "",
                GEN_EmailLogo = model.GEN_EmailLogo ?? "",
                GEN_CompanyName = model.GEN_CompanyName ?? "",
                GEN_FrontWebsite = model.GEN_FrontWebsite ?? "",
                GEN_BackendApp = model.GEN_BackendApp ?? "",
                GEN_OfficeAdd = model.GEN_OfficeAdd ?? "",
                GEN_Phone = model.GEN_Phone ?? "",
                GEN_Fax = model.GEN_Fax ?? "",
                GEN_Email = model.GEN_Email ?? "",
                GEN_Clock1Label = model.GEN_Clock1Label ?? "",
                GEN_Clock1Time = model.GEN_Clock1Time ?? "",
                GEN_Clock1Active = model.GEN_Clock1Active ?? false,
                GEN_Clock2Label = model.GEN_Clock2Label ?? "",
                GEN_Clock2Time = model.GEN_Clock2Time ?? "",
                GEN_Clock2Active = model.GEN_Clock2Active ?? false,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.MinValue
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<SiteSettings>> GetList()
        {
            return await GetAll(); ;
        }

        public async Task<int> DeleteSiteSettings(int id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateSiteSettings(SiteSettingsModel model)
        {
            var item = await GetById(model.Id);
            item.DATA_MonthShow = model.DATA_MonthShow ?? "";
            item.DATA_QuoteShow = model.DATA_QuoteShow ?? "";
            item.UPSAPI_AccessToken = model.UPSAPI_AccessToken ?? "";
            item.UPSAPI_Username = model.UPSAPI_Username ?? "";
            item.UPSAPI_Password = model.UPSAPI_Password ?? "";
            item.API_AccessToken = model.API_AccessToken ?? "";
            item.API_ClientSecret = model.API_ClientSecret ?? "";
            item.Prefix_Takeoff = model.Prefix_Takeoff ?? "";
            item.Prefix_Quote = model.Prefix_Quote ?? "";
            item.Prefix_Job = model.Prefix_Job ?? "";
            item.Prefix_Aw = model.Prefix_Aw ?? "";
            item.Prefix_AWF = model.Prefix_AWF ?? "";
            item.Prefix_SBC = model.Prefix_SBC ?? "";
            item.Prefix_SPL = model.Prefix_SPL ?? "";
            item.Prefix_J = model.Prefix_J ?? "";
            item.Prefix_Q = model.Prefix_Q ?? "";
            item.SMTP_Host = model.SMTP_Host ?? "";
            item.SMTP_Port = model.SMTP_Port ?? "";
            item.SMTP_Security = model.SMTP_Security ?? "";
            item.SMTP_Username = model.SMTP_Username ?? "";
            item.SMTP_Password = model.SMTP_Password ?? "";
            item.SMTP_FromEmail = model.SMTP_FromEmail ?? "";
            item.THEME_Current = model.THEME_Current ?? "";
            item.THEME_InvoiceTemp = model.THEME_InvoiceTemp ?? "";
            item.THEME_QuotePaperSize = model.THEME_QuotePaperSize ?? "";
            item.GEN_LoginLogo = model.GEN_LoginLogo ?? "";
            item.GEN_HeaderLogo = model.GEN_HeaderLogo ?? "";
            item.GEN_EmailLogo = model.GEN_EmailLogo ?? "";
            item.GEN_CompanyName = model.GEN_CompanyName ?? "";
            item.GEN_FrontWebsite = model.GEN_FrontWebsite ?? "";
            item.GEN_BackendApp = model.GEN_BackendApp ?? "";
            item.GEN_OfficeAdd = model.GEN_OfficeAdd ?? "";
            item.GEN_Phone = model.GEN_Phone ?? "";
            item.GEN_Fax = model.GEN_Fax ?? "";
            item.GEN_Email = model.GEN_Email ?? "";
            item.GEN_Clock1Label = model.GEN_Clock1Label ?? "";
            item.GEN_Clock1Time = model.GEN_Clock1Time ?? "";
            item.GEN_Clock1Active = model.GEN_Clock1Active ?? false;
            item.GEN_Clock2Label = model.GEN_Clock2Label ?? "";
            item.GEN_Clock2Time = model.GEN_Clock2Time ?? "";
            item.GEN_Clock2Active = model.GEN_Clock2Active ?? false;
            item.CreatedAt = DateTime.Now;
            item.UpdatedAt = DateTime.MinValue;

            var result = await Update(item);
            return result;
        }

        public async Task<SiteSettings> GetSiteSettings(int id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
