using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;

namespace ABKNew.Server.Repositories
{
    public class ContractorsRepository : GenericRepository<Contractors>, IContractorsRepository
    {
        public ContractorsRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddContractors(ContractorsModel model)
        {
            Contractors item = new()
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Address = model.Address ?? "",
                City = model.City ?? "",
                Email = model.Email,
                Fax = model.Fax ?? "",
                Phone = model.Phone,
                SalespersonId = model.SalespersonId,
                State = model.State ?? "",
                Website = model.Website ?? "",
                Zipcode = model.Zipcode ?? "",
                Created_at = DateTime.Now
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<Contractors>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeleteContractors(int id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateContractors(ContractorsModel model)
        {
            var item = await GetById(model.Id);
            item.FirstName = model.FirstName;
            item.LastName = model.LastName;
            item.Address = model.Address ?? "";
            item.City = model.City ?? "";
            item.Email = model.Email;
            item.Fax = model.Fax ?? "";
            item.Phone = model.Phone;
            item.SalespersonId = model.SalespersonId;
            item.State = model.State ?? "";
            item.Website = model.Website ?? "";
            item.Zipcode = model.Zipcode ?? "";
            item.Created_at = DateTime.Now;

            var result = await Update(item);
            return result;
        }

        public async Task<Contractors> GetContractors(int id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
