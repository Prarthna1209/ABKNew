using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.CodeAnalysis;

namespace ABKNew.Server.Repositories
{
    public class WorksheetItemsRepository : GenericRepository<WorksheetItems>, IWorksheetItemsRepository
    {
        public WorksheetItemsRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddWorksheetItems(WorksheetItemsModel model)
        {
            WorksheetItems item = new WorksheetItems
            {
                Id = Guid.NewGuid().ToString(),
                ListPrice = model.ListPrice,
                ManufacturerId = model.ManufacturerId,
                Net = model.Net,
                ProductId = model.ProductId,
                Quantity = model.Quantity,
                Unit = model.Unit,
                WorksheetId = model.WorksheetId,
                CreatedAt = DateTime.Now
            };

            var result = await Add(item);
            return result;
        }


        public async Task<int> BulkSave(List<WorksheetItems> items)
        {
            int result = 0;

            await _context.WorksheetItems.AddRangeAsync(items); // Bulk Insert
            result = await _context.SaveChangesAsync(); // Save to Database

            return result;
        }

        public async Task<IEnumerable<WorksheetItems>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeleteWorksheetItems(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> DeleteByWorksheetId(string id)
        {
            var item = (WorksheetItems)(from w in _context.WorksheetItems
                                        where w.WorksheetId == id
                                        select w);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateWorksheetItems(WorksheetItemsModel model)
        {
            var item = await GetById(model.Id);
            item.ListPrice = model.ListPrice == 0 ? item.ListPrice : model.ListPrice;
            item.ManufacturerId = model.ManufacturerId ?? item.ManufacturerId;
            item.Net = model.Net == 0 ? item.Net : model.Net;
            item.ProductId = model.ProductId ?? item.ProductId;
            item.Quantity = model.Quantity == 0 ? item.Quantity : model.Quantity;
            item.Unit = model.Unit ?? item.Unit;
            item.WorksheetId = model.WorksheetId ?? item.WorksheetId;
            item.UpdatedAt = DateTime.Now;

            var result = await Update(item);
            return result;
        }

        public async Task<WorksheetItems> GetWorksheetItems(string id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
