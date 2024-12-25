using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ABKNew.Server.Repositories
{
    public class EmailAccountsRepository : GenericRepository<EmailAccounts>, IEmailAccountsRepository
    {
        public EmailAccountsRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddEmailAccounts(EmailAccountsModel model)
        {
            EmailAccounts item = new()
            {
                Id = Guid.NewGuid().ToString(),
                Followup_Email = model.Followup_Email,
                Followup_Password = model.Followup_Password,
                Takeoff_Email = model.Takeoff_Email ?? "",
                Takeoff_Password = model.Takeoff_Password ?? "",
                BidReq_Email = model.BidReq_Email ?? "",
                BidReq_Password = model.BidReq_Password ?? "",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.MinValue
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<EmailAccounts>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeleteEmailAccounts(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateEmailAccounts(EmailAccountsModel model)
        {
            var item = await GetById(model.Id.ToString());
            item.Followup_Email = model.Followup_Email;
            item.Followup_Password = model.Followup_Password;
            item.Takeoff_Email = model.Takeoff_Email ?? "";
            item.Takeoff_Password = model.Takeoff_Password ?? "";
            item.BidReq_Email = model.BidReq_Email ?? "";
            item.BidReq_Password = model.BidReq_Password ?? "";
            item.CreatedAt = DateTime.Now;
            item.UpdatedAt = DateTime.MinValue;

            var result = await Update(item);
            return result;
        }

        public async Task<EmailAccounts> GetEmailAccounts(string id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
