using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IManufacturersRepository : IGenericRepository<Manufacturers>
    {
        Task<IEnumerable<Manufacturers>> GetList();
        Task<Manufacturers> GetManufacturers(int id);
        Task<int> AddManufacturers(ManufacturersModel Manufacturers);
        Task<int> UpdateManufacturers(ManufacturersModel Manufacturers);
        Task<int> DeleteManufacturers(int id);
    }
}
