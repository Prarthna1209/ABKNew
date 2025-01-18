using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.IdentityModel.Tokens;

namespace ABKNew.Server.Repositories
{
    public class ProductsRepository : GenericRepository<Products>, IProductsRepository
    {
        public ProductsRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddProducts(ProductsModel model)
        {
            Products item = new Products
            {
                Id = Guid.NewGuid().ToString(),
                Name = model.Name,
                Range1 = model.Range1,
                Range2 = model.Range2,
                Range3 = model.Range3,
                CreatedAt = DateTime.Now
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<Products>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeleteProducts(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateProducts(ProductsModel model)
        {
            var item = await GetById(model.Id);
            if (!model.Name.IsNullOrEmpty())
                item.Name = model.Name;
            if (!model.Range1.IsNullOrEmpty())
                item.Range1 = model.Range1;
            if (!model.Range2.IsNullOrEmpty())
                item.Range2 = model.Range2;
            if (!model.Range3.IsNullOrEmpty())
                item.Range3 = model.Range3;
            item.UpdatedAt = DateTime.Now;

            var result = await Update(item);
            return result;
        }

        public async Task<Products> GetProducts(string id)
        {
            var item = await GetById(id);
            return item;
        }

    }
}
