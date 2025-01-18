using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;

namespace ABKNew.Server.Repositories
{
    public class EngineeringRepository : GenericRepository<Engineering>, IEngineeringRepository
    {
        public EngineeringRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddEngineering(EngineeringModel model)
        {
            Engineering item = new()
            {
                Id = Guid.NewGuid().ToString(),
                JobName = model.JobName,
                JobAddress = model.JobAddress,
                ProjectNumber = model.ProjectNumber ?? "",
                CreateDate = DateTime.Now,
                EngineerId = model.EngineerId ?? "",
                Comment = model.Comment ?? "",
                ModelNumber = model.ModelNumber,
                UserId = model.UserId ?? "",
                SalesmanId = model.SalesmanId
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<Engineering>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeleteEngineering(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateEngineering(EngineeringModel model)
        {
            var item = await GetById(model.Id.ToString());
            item.JobName = model.JobName;
            item.JobAddress = model.JobAddress;
            item.ProjectNumber = model.ProjectNumber ?? "";
            item.CreateDate = DateTime.Now;
            item.EngineerId = model.EngineerId ?? "";
            item.Comment = model.Comment ?? "";
            item.ModelNumber = model.ModelNumber;
            item.UserId = model.UserId ?? "";
            item.SalesmanId = model.SalesmanId;

            var result = await Update(item);
            return result;
        }

        public async Task<Engineering> GetEngineering(string id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
