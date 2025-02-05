using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IWorksheetItemsRepository : IGenericRepository<WorksheetItems>
    {
        Task<IEnumerable<WorksheetItems>> GetList();
        Task<WorksheetItems> GetWorksheetItems(string id);
        Task<int> AddWorksheetItems(WorksheetItemsModel WorksheetItems);
        Task<int> BulkSave(List<WorksheetItems> WorksheetItems);
        Task<int> UpdateWorksheetItems(WorksheetItemsModel WorksheetItems);
        Task<int> DeleteWorksheetItems(string id);
        Task<int> DeleteByWorksheetId(string id);
    }
}
