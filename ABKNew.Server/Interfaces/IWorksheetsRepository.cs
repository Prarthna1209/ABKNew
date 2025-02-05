using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IWorksheetsRepository : IGenericRepository<Worksheets>
    {
        Task<IEnumerable<Worksheets>> GetList();
        Task<Worksheets> GetWorksheets(string id);
        Task<Dictionary<string, object>> AddWorksheets(WorksheetsModel Worksheets);
        Task<Dictionary<string, object>> UpdateWorksheets(WorksheetsModel Worksheets);
        Task<int> DeleteWorksheets(string id);
    }
}
