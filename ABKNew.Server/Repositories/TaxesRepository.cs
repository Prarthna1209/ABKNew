using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;

namespace ABKNew.Server.Repositories
{
    public class TaxesRepository : GenericRepository<Taxes>, ITaxesRepository
    {
        public TaxesRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddTax(TaxesModel model)
        {
            Taxes item = new Taxes
            {
                Id = Guid.NewGuid().ToString(),
                Region = model.Region,
                Updated_At = model.Updated_At,
                Created_At = DateTime.Now,
                Rate = model.Rate,
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<Taxes>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeleteTax(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateTax(TaxesModel model)
        {
            var item = await GetById(model.Id);
            item.Region = model.Region;
            item.Rate = model.Rate;
            item.Updated_At = model.Updated_At;

            var result = await Update(item);
            return result;
        }

        public async Task<Taxes> GetTax(string id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
