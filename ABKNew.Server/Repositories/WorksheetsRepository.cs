using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;

namespace ABKNew.Server.Repositories
{
    public class WorksheetsRepository : GenericRepository<Worksheets>, IWorksheetsRepository
    {
        public WorksheetsRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<Dictionary<string, object>> AddWorksheets(WorksheetsModel model)
        {
            Worksheets item = new Worksheets
            {
                Id = Guid.NewGuid().ToString(),
                Comments = model.Comments,
                Freight = model.Freight,
                JobSpecificNotes = model.JobSpecificNotes,
                ManufacturerId = model.ManufacturerId,
                Multiplier = model.Multiplier,
                QuoteAmount = model.QuoteAmount,
                TakeoffId = model.TakeoffId,
                TlpMultiplier = model.TlpMultiplier,
                UpdatedBy = model.UpdatedBy,
                CreatedBy = model.CreatedBy,
                CreatedAt = DateTime.Now
            };

            var result = await Add(item);
            Dictionary<string, object> obj = new Dictionary<string, object>
            {
                {"result", result},
                {"id", item.Id }
            };
            return obj;
        }

        public async Task<IEnumerable<Worksheets>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeleteWorksheets(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<Dictionary<string,object>> UpdateWorksheets(WorksheetsModel model)
        {
            var item = await GetById(model.Id);
            item.Comments = model.Comments ?? item.Comments;
            item.Freight = model.Freight ?? item.Freight;
            item.JobSpecificNotes = model.JobSpecificNotes ?? item.JobSpecificNotes;
            item.ManufacturerId = model.ManufacturerId ?? item.ManufacturerId;
            item.Multiplier = model.Multiplier ?? item.Multiplier;
            item.QuoteAmount = model.QuoteAmount ?? item.QuoteAmount;
            item.TakeoffId = model.TakeoffId ?? item.TakeoffId;
            item.TlpMultiplier = model.TlpMultiplier ?? item.TlpMultiplier;
            item.UpdatedBy = model.UpdatedBy ?? item.UpdatedBy;
            //item.CreatedBy = model.CreatedBy;
            //item.CreatedAt = DateTime.Now;

            var result = await Update(item);
            Dictionary<string, object> obj = new Dictionary<string, object>
            {
                {"result", result},
                {"id", item.Id }
            };
            return obj;
        }

        public async Task<Worksheets> GetWorksheets(string id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
