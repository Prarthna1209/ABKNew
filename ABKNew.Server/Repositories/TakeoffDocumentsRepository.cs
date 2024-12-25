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
    public class TakeoffDocumentsRepository : GenericRepository<TakeoffDocuments>, ITakeoffDocumentsRepository
    {
        public TakeoffDocumentsRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddTakeoffDocuments(TakeoffDocumentsModel model)
        {
            TakeoffDocuments item = new()
            {
                Id = Guid.NewGuid().ToString(),
                File = model.File ?? "",
                IsVibro = model.IsVibro ?? null,
                TakeoffId = model.TakeoffId ?? "",
                Type = model.Type ?? null,
                UploadedBy = model.UploadedBy ?? "",
                UpdatedAt = model.UpdatedAt ?? DateTime.MinValue,
                CreatedAt = DateTime.Now
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<TakeoffDocuments>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeleteTakeoffDocuments(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateTakeoffDocuments(TakeoffDocumentsModel model)
        {
            var item = await GetById(model.Id);
            item.TakeoffId = model.TakeoffId ?? item.TakeoffId;
            item.UploadedBy = model.UploadedBy ?? item.UploadedBy;
            item.UpdatedAt = model.UpdatedAt ?? item.UpdatedAt;
            item.File = model.File ?? item.File;
            item.IsVibro = model.IsVibro ?? item.IsVibro;
            item.UpdatedAt = model.UpdatedAt ?? item.UpdatedAt;
            item.CreatedAt = model.CreatedAt;

            var result = await Update(item);
            return result;
        }

        public async Task<TakeoffDocuments> GetTakeoffDocuments(string id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
