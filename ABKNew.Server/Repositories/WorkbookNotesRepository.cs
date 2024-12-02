using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;

namespace ABKNew.Server.Repositories
{
    public class WorkbookNotesRepository : GenericRepository<WorkbookNotes>, IWorkbookNotesRepository
    {
        public WorkbookNotesRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddWorkbookNote(WorkbookNotesModel model)
        {
            WorkbookNotes item = new WorkbookNotes
            {
                Note = model.Note,
                Created_by = model.Created_by,
                Created_at = DateTime.Now
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<WorkbookNotes>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeleteWorkbookNote(int id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateWorkbookNote(WorkbookNotesModel model)
        {
            var item = await GetById(model.Id);
            item.Note = model.Note;
            item.Updated_at = model.Updated_at;

            var result = await Update(item);
            return result;
        }

        public async Task<WorkbookNotes> GetWorkbookNote(int id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
