using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface ITaxesRepository : IGenericRepository<Taxes>
    {
        Task<IEnumerable<Taxes>> GetList();
        Task<Taxes> GetTax(string id);
        Task<int> AddTax(TaxesModel Tax);
        Task<int> UpdateTax(TaxesModel Tax);
        Task<int> DeleteTax(string id);
    }
}
