using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;

namespace ABKNew.Server.Repositories
{
    public class PMRepository : GenericRepository<PM>, IPMRepository
    {
        public PMRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddPM(PMModel model)
        {
            PM item = new()
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Phone = model.Phone,
                CreatedAt = DateTime.Now,
                ContractorId = model.ContractorId,
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<PM>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeletePM(int id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdatePM(PMModel model)
        {
            var item = await GetById(model.Id);
            item.FirstName = model.FirstName;
            item.LastName = model.LastName;
            item.Email = model.Email;
            item.Phone = model.Phone;
            item.CreatedAt = DateTime.Now;
            item.ContractorId = model.ContractorId;

            var result = await Update(item);
            return result;
        }

        public async Task<PM> GetPM(int id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
