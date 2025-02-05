using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;

namespace ABKNew.Server.Repositories
{
    public class WorkbookNotesWorksheetRepository : GenericRepository<WorkbookNotesWorksheet>, IWorkbookNotesWorksheetRepository
    {
        public WorkbookNotesWorksheetRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddWorkbookNotesWorksheet(WorkbookNotesWorksheetModel model)
        {
            WorkbookNotesWorksheet item = new WorkbookNotesWorksheet
            {
                Id = Guid.NewGuid().ToString(),
                WorksheetId = model.WorksheetId,
                WorksheetNoteId = model.WorksheetNoteId,
                CreatedAt = DateTime.Now
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<WorkbookNotesWorksheet>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeleteWorkbookNotesWorksheet(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> DeleteByWorksheetId(string id)
        {
            var item = (WorkbookNotesWorksheet)(from w in _context.WorkbookNotesWorksheet
                                                where w.WorksheetId == id
                                                select w);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateWorkbookNotesWorksheet(WorkbookNotesWorksheetModel model)
        {
            var item = await GetById(model.Id);
            item.WorksheetId = model.WorksheetId;
            item.WorksheetNoteId = model.WorksheetNoteId;
            item.UpdatedAt = DateTime.Now;

            var result = await Update(item);
            return result;
        }

        public async Task<WorkbookNotesWorksheet> GetWorkbookNotesWorksheet(string id)
        {
            var item = await GetById(id);
            return item;
        }

        public async Task<int> BulkSave(List<WorkbookNotesWorksheet> items)
        {
            int result = 0;

            await _context.WorkbookNotesWorksheet.AddRangeAsync(items); // Bulk Insert
            result = await _context.SaveChangesAsync(); // Save to Database

            return result;
        }
    }
}
