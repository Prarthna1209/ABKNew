using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IPMRepository : IGenericRepository<PM>
    {
        Task<IEnumerable<PM>> GetList();
        Task<PM> GetPM(string id);
        Task<int> AddPM(PMModel PM);
        Task<int> UpdatePM(PMModel PM);
        Task<int> DeletePM(string id);
    }
}
