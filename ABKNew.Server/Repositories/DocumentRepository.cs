using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using static System.Collections.Specialized.BitVector32;

namespace ABKNew.Server.Repositories
{
    public class DocumentsRepository : GenericRepository<Documents>, IDocumentsRepository
    {
        public DocumentsRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddDocuments(DocumentsModel model)
        {
            var file = model.File;
            string fileType = "";
            string filename = "";
            byte[] fileData = null;
            if (file.Length > 0)
            {
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    fileData = stream.ToArray();
                    fileType = file.ContentType;
                    filename = file.Name;
                }
            }
            Documents item = new()
            {
                Id = Guid.NewGuid().ToString(),
                Data = fileData,
                FileName = model.FileName ?? filename,
                Section = model.Section,
                SectionId = model.SectionId,
                Type = model.Type ?? fileType,
                CreatedAt = DateTime.Now,
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<Documents>> GetList(string sectionId)
        {
            IEnumerable<Documents> list = (IEnumerable<Documents>)
                (from doc in _context.Documents
                 where doc.SectionId == sectionId
                 select doc).ToList();
            return list;
        }

        public async Task<int> DeleteDocuments(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateDocuments(DocumentsModel model)
        {
            var file = model.File;
            string fileType = "";
            string filename = "";
            byte[] fileData = null;
            if (file.Length > 0)
            {
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    fileData = stream.ToArray();
                    fileType = file.ContentType;
                    filename = file.Name;
                }
            }
            var item = await GetById(model.Id);
            item.Data = fileData;
            item.FileName = model.FileName ?? filename;
            item.Section = model.Section;
            item.SectionId = model.SectionId;
            item.Type = model.Type ?? fileType;
            item.CreatedAt = DateTime.Now;

            var result = await Update(item);
            return result;
        }

        public async Task<Documents> GetDocuments(string id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
