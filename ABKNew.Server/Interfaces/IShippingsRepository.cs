using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IShippingsRepository : IGenericRepository<Shippings>
    {
        Task<IEnumerable<Shippings>> GetList(string Type);
        Task<Shippings> GetShipping(int id);
        Task<int> AddShipping(ShippingModel Shipping);
        Task<int> UpdateShipping(ShippingModel Shipping);
        Task<int> DeleteShipping(int id);
    }
}
