using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface ITakeoffRepository : IGenericRepository<Takeoff>
    {
        Task<IEnumerable<Takeoff>> GetList();
        Task<Takeoff> GetTakeoff(string id);
        Task<int> AddTakeoff(TakeoffModel Takeoff);
        Task<int> UpdateTakeoff(TakeoffModel Takeoff);
        Task<int> DeleteTakeoff(string id);
    }
}
