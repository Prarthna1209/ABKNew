using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;

namespace ABKNew.Server.Repositories
{
    public class SpecificationsRepository:GenericRepository<Specifications>, ISpecificationRepository
    {
        public SpecificationsRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddSpecifications(SpecificationsModel model)
        {
            Specifications item = new Specifications
            {
                Id = Guid.NewGuid().ToString(),
                Name = model.Name,
                Created_by = model.Created_by,
                Created_at = DateTime.Now
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<Specifications>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeleteSpecifications(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateSpecifications(SpecificationsModel model)
        {
            var item = await GetById(model.Id);
            item.Name = model.Name;
            item.Updated_at = model.Updated_at;

            var result = await Update(item);
            return result;
        }

        public async Task<Specifications> GetSpecifications(string id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
