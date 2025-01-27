using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface ITakeoffRepository : IGenericRepository<Takeoff>
    {
        Task<IEnumerable<TakeoffDetails>> GetList();
        Task<IEnumerable<TakeoffDetails>> GetPendingQuotes();
        Task<IEnumerable<TakeoffDetails>> GetQuotes();
        Task<TakeoffDetails> GetTakeoff(string id);
        Task<int> AddTakeoff(TakeoffModel Takeoff, string prefix);
        Task<int> UpdateTakeoff(TakeoffModel Takeoff);
        Task<int> GenerateQuote(string Id, string prefix);
        Task<string> GetTakeoffId(string prefix);
        Task<string> GetQuoteId(string prefix);
        Task<int> DeleteTakeoff(string id);
    }
}
