using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IEngineeringRepository : IGenericRepository<Engineering>
    {
        Task<IEnumerable<Engineering>> GetList();
        Task<Engineering> GetEngineering(string id);
        Task<int> AddEngineering(EngineeringModel Engineering);
        Task<int> UpdateEngineering(EngineeringModel Engineering);
        Task<int> DeleteEngineering(string id);
    }
}
