using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IWorkbookNotesRepository : IGenericRepository<WorkbookNotes>
    {
        Task<IEnumerable<WorkbookNotes>> GetList();
        Task<WorkbookNotes> GetWorkbookNote(int id);
        Task<int> AddWorkbookNote(WorkbookNotesModel workbookNote);
        Task<int> UpdateWorkbookNote(WorkbookNotesModel workbookNote);
        Task<int> DeleteWorkbookNote(int id);
    }
}
