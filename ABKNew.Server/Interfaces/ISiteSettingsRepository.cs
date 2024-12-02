using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface ISiteSettingsRepository : IGenericRepository<SiteSettings>
    {
        Task<IEnumerable<SiteSettings>> GetList();
        //List<SiteSettings> GetSalesPersons();
        Task<SiteSettings> GetSiteSettings(int id);
        Task<int> AddSiteSettings(SiteSettingsModel SiteSettings);
        Task<int> UpdateSiteSettings(SiteSettingsModel SiteSettings);
        Task<int> DeleteSiteSettings(int id);
    }
}
