using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IContractorsRepository : IGenericRepository<Contractors>
    {
        Task<IEnumerable<Contractors>> GetList();
        Task<Contractors> GetContractors(string id);
        Task<int> AddContractors(ContractorsModel Contractors);
        Task<int> UpdateContractors(ContractorsModel Contractors);
        Task<int> DeleteContractors(string id);
    }
}
