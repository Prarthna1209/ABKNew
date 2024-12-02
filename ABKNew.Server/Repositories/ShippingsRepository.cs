using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;

namespace ABKNew.Server.Repositories
{
    public class ShippingsRepository : GenericRepository<Shippings>, IShippingsRepository
    {
        public ShippingsRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddShipping(ShippingModel model)
        {
            Shippings item = new Shippings
            {
                Name = model.Name,
                Updated_at = model.Updated_at,
                Created_By = model.Created_By,
                Created_at = DateTime.Now,
                Type = model.Type,
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<Shippings>> GetList(string type)
        {
            var list = await GetAll();
            return list.Where(o => o.Type == type);
        }

        public async Task<int> DeleteShipping(int id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateShipping(ShippingModel model)
        {
            var item = await GetById(model.Id);
            item.Name = model.Name;
            item.Type = model.Type;
            item.Updated_at = model.Updated_at;

            var result = await Update(item);
            return result;
        }

        public async Task<Shippings> GetShipping(int id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
