using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;

namespace ABKNew.Server.Repositories
{
    public class PDNIWorksheetRepository : GenericRepository<PDNIWorksheet>, IPDNIWorksheetRepository
    {
        public PDNIWorksheetRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddPDNIWorksheet(PDNIWorksheetModel model)
        {
            PDNIWorksheet item = new PDNIWorksheet
            {
                Id = Guid.NewGuid().ToString(),
                PdniId = model.PdniId,
                WorksheetId = model.WorksheetId,
                CreatedAt = DateTime.Now
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<PDNIWorksheet>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeletePDNIWorksheet(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> DeleteByWorksheetId(string id)
        {
            var item = (PDNIWorksheet)(from p in _context.PDNIWorksheet
                                       where p.WorksheetId == id
                                       select p);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdatePDNIWorksheet(PDNIWorksheetModel model)
        {
            var item = await GetById(model.Id);
            item.PdniId = model.PdniId;
            item.WorksheetId = model.WorksheetId;
            item.UpdatedAt = model.UpdatedAt;

            var result = await Update(item);
            return result;
        }

        public async Task<PDNIWorksheet> GetPDNIWorksheet(string id)
        {
            var item = await GetById(id);
            return item;
        }

        public async Task<int> BulkSave(List<PDNIWorksheet> items)
        {
            int result = 0;

            await _context.PDNIWorksheet.AddRangeAsync(items); // Bulk Insert
            result = await _context.SaveChangesAsync(); // Save to Database

            return result;
        }

    }
}
