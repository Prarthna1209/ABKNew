using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;

namespace ABKNew.Server.Repositories
{
    public class ManufacturersRepository : GenericRepository<Manufacturers>, IManufacturersRepository
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
            var list = (IEnumerable<Manufacturers>)(
                from m in _context.Manufacturers
                join p in _context.Products
                    on m.Id equals p.ManufacturerId into products
                select new Manufacturers
                {
                    Id = m.Id,
                    IsFeatured = m.IsFeatured,
                    Name = m.Name,
                    TLP = m.TLP,
                    TTL = m.TTL,
                    Created_at = m.Created_at,
                    Created_by = m.Created_by,
                    Updated_at = m.Updated_at,
                    ProductCount = products.Count()
                }
                );
            return list;
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
            var item = (Manufacturers)(
                from m in _context.Manufacturers
                where m.Id == id
                join p in _context.Products
                    on m.Id equals p.ManufacturerId into products
                select new
                {
                    m,
                    ProductCount = products.Count()
                }
                );
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
