using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface ITakeoffRepository : IGenericRepository<Takeoff>
    {
        Task<IEnumerable<TakeoffDetails>> GetList();
        Task<TakeoffDetails> GetTakeoff(string id);
        Task<int> AddTakeoff(TakeoffModel Takeoff);
        Task<int> UpdateTakeoff(TakeoffModel Takeoff);
        Task<int> GenerateQuote(string Id);
        Task<string> GetTakeoffId();
        Task<string> GetQuoteId();
        Task<int> DeleteTakeoff(string id);
    }
}
