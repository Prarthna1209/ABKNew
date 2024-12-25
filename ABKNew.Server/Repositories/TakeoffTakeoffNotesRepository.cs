using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.VisualBasic;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using System.Xml.Linq;

namespace ABKNew.Server.Repositories
{
    public class TakeoffTakeoffNotesRepository : GenericRepository<TakeoffTakeoffNotes>, ITakeoffTakeoffNotesRepository
    {
        public TakeoffTakeoffNotesRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddTakeoffTakeoffNotes(TakeoffTakeoffNotesModel model)
        {
            TakeoffTakeoffNotes item = new()
            {
                Id = Guid.NewGuid().ToString(),
                TakeoffId = model.TakeoffId ?? "",
                TakeoffNoteId = model.TakeoffNoteId ?? "",
                UpdatedAt = model.UpdatedAt ?? DateTime.MinValue,
                CreatedAt = DateTime.Now
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<TakeoffTakeoffNotes>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeleteTakeoffTakeoffNotes(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateTakeoffTakeoffNotes(TakeoffTakeoffNotesModel model)
        {
            var item = await GetById(model.Id);
            item.TakeoffId = model.TakeoffId ?? item.TakeoffId;
            item.TakeoffNoteId = model.TakeoffNoteId ?? item.TakeoffNoteId;
            item.UpdatedAt = model.UpdatedAt ?? item.UpdatedAt;
            item.CreatedAt = model.CreatedAt;

            var result = await Update(item);
            return result;
        }

        public async Task<TakeoffTakeoffNotes> GetTakeoffTakeoffNotes(string id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
