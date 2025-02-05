using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IPDNIWorksheetRepository : IGenericRepository<PDNIWorksheet>
    {
        Task<IEnumerable<PDNIWorksheet>> GetList();
        Task<PDNIWorksheet> GetPDNIWorksheet(string id);
        Task<int> AddPDNIWorksheet(PDNIWorksheetModel PDNIWorksheet);
        Task<int> BulkSave(List<PDNIWorksheet> PDNIWorksheet);
        Task<int> UpdatePDNIWorksheet(PDNIWorksheetModel PDNIWorksheet);
        Task<int> DeletePDNIWorksheet(string id);
        Task<int> DeleteByWorksheetId(string id);
    }
}
