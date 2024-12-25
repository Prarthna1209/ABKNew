using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface ITakeoffNotesRepository : IGenericRepository<TakeoffNotes>
    {
        Task<IEnumerable<TakeoffNotes>> GetList();
        Task<TakeoffNotes> GetTakeoffNotes(string id);
        Task<int> AddTakeoffNotes(TakeoffNotesModel TakeoffNotes);
        Task<int> UpdateTakeoffNotes(TakeoffNotesModel TakeoffNotes);
        Task<int> DeleteTakeoffNotes(string id);
    }
}
