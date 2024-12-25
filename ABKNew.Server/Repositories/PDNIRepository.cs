using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;

namespace ABKNew.Server.Repositories
{
    public class PDNIRepository:GenericRepository<PDNI>, IPDNIRepository
    {
        public PDNIRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddPDNI(PDNIModel model)
        {
            PDNI item = new PDNI
            {
                Id = Guid.NewGuid().ToString(),
                Name = model.Name,
                Created_by = model.Created_by,
                Created_at = DateTime.Now
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<PDNI>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeletePDNI(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdatePDNI(PDNIModel model)
        {
            var item = await GetById(model.Id);
            item.Name = model.Name;
            item.Updated_at = model.Updated_at;

            var result = await Update(item);
            return result;
        }

        public async Task<PDNI> GetPDNI(string id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
