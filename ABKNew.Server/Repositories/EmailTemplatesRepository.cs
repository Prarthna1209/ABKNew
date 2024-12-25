using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ABKNew.Server.Repositories
{
    public class EmailTemplatesRepository : GenericRepository<EmailTemplates>, IEmailTemplatesRepository
    {
        public EmailTemplatesRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddEmailTemplates(EmailTemplatesModel model)
        {
            EmailTemplates item = new()
            {
                Id = Guid.NewGuid().ToString(),
                Name = model.Name,
                Mailable = model.Mailable,
                HtmlTemplate = model.HtmlTemplate,
                TextTemplate = model.TextTemplate,
                Subject = model.Subject,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<EmailTemplates>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeleteEmailTemplates(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateEmailTemplates(EmailTemplatesModel model)
        {
            var item = await GetById(model.Id);
            item.Name = model.Name;
            item.Mailable = model.Mailable;
            item.HtmlTemplate = model.HtmlTemplate;
            item.TextTemplate = model.TextTemplate;
            item.Subject = model.Subject;
            item.CreatedAt = DateTime.Now;
            item.UpdatedAt = DateTime.Now;

            var result = await Update(item);
            return result;
        }

        public async Task<EmailTemplates> GetEmailTemplates(string id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
