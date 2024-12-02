using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;

namespace ABKNew.Server.Repositories
{
    public class UserRolesRepository : GenericRepository<UserRoles>, IUserRolesRepository
    {
        public UserRolesRepository(ABKDBContext dbContext) : base(dbContext) { }


        public async Task<int> AddUserRoles(UserRolesModel model)
        {
            UserRoles item = new()
            {
                Name = model.Name
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<UserRoles>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeleteUserRoles(int id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<int> UpdateUserRoles(UserRolesModel model)
        {
            var item = await GetById(model.Id);
            item.Name = model.Name;

            var result = await Update(item);
            return result;
        }

        public async Task<UserRoles> GetUserRoles(int id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
