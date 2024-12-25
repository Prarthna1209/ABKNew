using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface ISpecificationRepository : IGenericRepository<Specifications>
    {
        Task<IEnumerable<Specifications>> GetList();
        Task<Specifications> GetSpecifications(string id);
        Task<int> AddSpecifications(SpecificationsModel Specifications);
        Task<int> UpdateSpecifications(SpecificationsModel Specifications);
        Task<int> DeleteSpecifications(string id);
    }
}
