using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IUsersRepository : IGenericRepository<Users>
    {
        Task<IEnumerable<Users>> GetList();
        List<Users> GetSalesPersons();
        Task<Users> GetUsers(string id);
        Task<int> AddUsers(UsersModel Users);
        Task<int> UpdateUsers(UsersModel Users);
        Task<int> DeleteUsers(string id);
    }
}
