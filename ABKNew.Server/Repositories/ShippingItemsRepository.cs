using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;

namespace ABKNew.Server.Repositories
{
    public class ShippingItemsRepository : GenericRepository<ShippingItems>, IShippingItemsRepository
    {
        public ShippingItemsRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddShippingItem(ShippingItemsModel model)
        {
            ShippingItems item = new ShippingItems
            {
                Id = Guid.NewGuid().ToString(),
                Title = model.Title,
                Created_by = model.Created_by,
                Created_at = DateTime.Now
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<ShippingItems>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeleteShippingItem(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateShippingItem(ShippingItemsModel model)
        {
            var item = await GetById(model.Id);
            item.Title = model.Title;
            item.Updated_by = model.Updated_by;

            var result = await Update(item);
            return result;
        }

        public async Task<ShippingItems> GetShippingItem(string id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
