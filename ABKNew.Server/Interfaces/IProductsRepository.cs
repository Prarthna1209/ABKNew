using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IProductsRepository : IGenericRepository<Products>
    {
        Task<IEnumerable<Products>> GetList();
        Task<IEnumerable<Products>> GetProducts(string id);
        Task<int> AddProducts(ProductsModel Products);
        Task<int> UpdateProducts(ProductsModel Products);
        Task<int> DeleteProducts(string id);

    }
}
