using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;

namespace ABKNew.Server.Repositories
{
    public class UsersRepository : GenericRepository<Users>, IUsersRepository
    {
        public UsersRepository(ABKDBContext dbContext) : base(dbContext)
        {
        }

        private readonly IUserRolesRepository _userRolesRepository;
        public async Task<int> AddUsers(UsersModel model)
        {
            Users item = new()
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = model.FirstName,
                LastName = model.LastName,
                UserName = model.UserName,
                Usercode = model.Usercode,
                EmailVerifiedAt = model.EmailVerifiedAt ?? DateTime.MinValue,
                Password = model.Password,
                Phone = model.Phone ?? "",
                Email = model.Email,
                ProfileImage = model.ProfileImage ?? "",
                Remarks = model.Remarks ?? "",
                IsOnline = model.IsOnline ?? false,
                LastActivity = model.LastActivity ?? DateTime.Now,
                RoleId = model.RoleId,
                CreatedAt = DateTime.Now
            };

            var result = await Add(item);
            return result;
        }

        public List<Users> GetSalesPersons()
        {
            List<Users> users = ((IEnumerable<Users>)(from user in _context.Users
                                        join roles in _context.UserRoles on user.RoleId equals roles.Id
                                        where roles.Name == "Salesman"
                                        select user)).ToList();

            return users;
        }
        public async Task<IEnumerable<Users>> GetList()
        {
            IEnumerable<Users> users = await GetAll();
            var list = _context.Users.Include(user => user.Role);
            
            return list;
        }

        public async Task<int> DeleteUsers(string id)
        {
            var item = await GetById(id);
            item.IsDeleted = true;
            var result = await Update(item);
            return result;
        }

        public async Task<int> UpdateUsers(UsersModel model)
        {
            var item = await GetById(model.Id);
            item.FirstName = model.FirstName;
            item.LastName = model.LastName;
            item.UserName = model.UserName;
            item.Usercode = model.Usercode;
            item.EmailVerifiedAt = model.EmailVerifiedAt ?? DateTime.MinValue;
            item.Password = model.Password;
            item.Phone = model.Phone ?? "";
            item.Email = model.Email;
            item.ProfileImage = model.ProfileImage ?? "";
            item.Remarks = model.Remarks ?? "";
            item.IsOnline = model.IsOnline ?? false;
            item.LastActivity = model.LastActivity ?? DateTime.Now;
            item.RoleId = model.RoleId;
            item.CreatedAt = DateTime.Now;

            var result = await Update(item);
            return result;
        }

        public async Task<Users> GetUsers(string id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
