using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface ITakeoffTakeoffNotesRepository : IGenericRepository<TakeoffTakeoffNotes>
    {
        Task<IEnumerable<TakeoffTakeoffNotes>> GetList();
        Task<TakeoffTakeoffNotes> GetTakeoffTakeoffNotes(string id);
        Task<int> AddTakeoffTakeoffNotes(TakeoffTakeoffNotesModel TakeoffTakeoffNotes);
        Task<int> UpdateTakeoffTakeoffNotes(TakeoffTakeoffNotesModel TakeoffTakeoffNotes);
        Task<int> DeleteTakeoffTakeoffNotes(string id);
        Task<int> DeleteByTakeoffId(string id);
    }
}
