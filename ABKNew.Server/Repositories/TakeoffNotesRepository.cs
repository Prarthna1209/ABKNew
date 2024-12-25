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
    public class TakeoffNotesRepository : GenericRepository<TakeoffNotes>, ITakeoffNotesRepository
    {
        public TakeoffNotesRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddTakeoffNotes(TakeoffNotesModel model)
        {
            TakeoffNotes item = new()
            {
                Id = Guid.NewGuid().ToString(),
                Notes = model.Notes ?? "",
                UpdatedAt = model.UpdatedAt ?? DateTime.MinValue,
                CreatedAt = DateTime.Now
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<TakeoffNotes>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeleteTakeoffNotes(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateTakeoffNotes(TakeoffNotesModel model)
        {
            var item = await GetById(model.Id);
            item.Notes = model.Notes ?? item.Notes;
            item.UpdatedAt = model.UpdatedAt ?? item.UpdatedAt;
            item.CreatedAt = model.CreatedAt;

            var result = await Update(item);
            return result;
        }

        public async Task<TakeoffNotes> GetTakeoffNotes(string id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
