using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IWorkbookNotesWorksheetRepository : IGenericRepository<WorkbookNotesWorksheet>
    {
        Task<IEnumerable<WorkbookNotesWorksheet>> GetList();
        Task<WorkbookNotesWorksheet> GetWorkbookNotesWorksheet(string id);
        Task<int> AddWorkbookNotesWorksheet(WorkbookNotesWorksheetModel workbookNote);
        Task<int> UpdateWorkbookNotesWorksheet(WorkbookNotesWorksheetModel workbookNote);
        Task<int> DeleteWorkbookNotesWorksheet(string id);
    }
}
