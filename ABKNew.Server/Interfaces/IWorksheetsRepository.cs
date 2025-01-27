using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IWorksheetsRepository : IGenericRepository<Worksheets>
    {
        Task<IEnumerable<Worksheets>> GetList();
        Task<Worksheets> GetWorksheets(string id);
        Task<int> AddWorksheets(WorksheetsModel Worksheets);
        Task<int> UpdateWorksheets(WorksheetsModel Worksheets);
        Task<int> DeleteWorksheets(string id);
    }
}
