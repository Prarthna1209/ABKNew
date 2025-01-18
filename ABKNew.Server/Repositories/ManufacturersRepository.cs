using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;

namespace ABKNew.Server.Repositories
{
    public class ManufacturersRepository:GenericRepository<Manufacturers>, IManufacturersRepository
    {
        public ManufacturersRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddManufacturers(ManufacturersModel model)
        {
            Manufacturers item = new Manufacturers
            {
                Id = Guid.NewGuid().ToString(),
                Name = model.Name,
                IsFeatured = model.IsFeatured,
                TLP = model.TLP,
                TTL = model.TTL,
                Created_by = model.Created_by,
                Created_at = DateTime.Now
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<Manufacturers>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeleteManufacturers(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateManufacturers(ManufacturersModel model)
        {
            var item = await GetById(model.Id);
            item.Name = model.Name;
            item.IsFeatured = model.IsFeatured;
            item.TLP = model.TLP;
            item.TTL = model.TTL;
            item.Updated_at = model.Updated_at;

            var result = await Update(item);
            return result;
        }

        public async Task<Manufacturers> GetManufacturers(string id)
        {
            var item = await GetById(id);
            var prdCount = await ProductCount(id);
            item.ProductCount = prdCount;
            return item;
        }

        public async Task<int> ProductCount(string ManufacturerId = "")
        {
            List<Products> prd = ((IEnumerable<Products>)(from products in _context.Products
                                                          where products.ManufacturerId == ManufacturerId
                                                          select products)).ToList();

            return prd.Count;
        }
    }
}
