using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IEmailAccountsRepository : IGenericRepository<EmailAccounts>
    {
        Task<IEnumerable<EmailAccounts>> GetList();
        Task<EmailAccounts> GetEmailAccounts(string id);
        Task<int> AddEmailAccounts(EmailAccountsModel EmailAccounts);
        Task<int> UpdateEmailAccounts(EmailAccountsModel EmailAccounts);
        Task<int> DeleteEmailAccounts(string id);
    }
}
