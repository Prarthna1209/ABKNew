using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IEngineersRepository : IGenericRepository<Engineers>
    {
        Task<IEnumerable<Engineers>> GetList();
        Task<Engineers> GetEngineers(string id);
        Task<int> AddEngineers(EngineersModel Engineers);
        Task<int> UpdateEngineers(EngineersModel Engineers);
        Task<int> DeleteEngineers(string id);
    }
}
