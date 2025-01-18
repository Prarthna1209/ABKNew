using ABKNew.Server.Data;
using ABKNew.Server.Entities;
using ABKNew.Server.Interfaces;
using ABKNew.Server.Models;
using Microsoft.IdentityModel.Tokens;

namespace ABKNew.Server.Repositories
{
    public class PermissionsRepository : GenericRepository<Permissions>, IPermissionsRepository
    {
        public PermissionsRepository(ABKDBContext dbContext) : base(dbContext) { }

        public async Task<int> AddPermissions(PermissionsModel model)
        {
            Permissions item = new Permissions
            {
                Id = Guid.NewGuid().ToString(),
                Name = model.Name,
                Module = model.Module,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.MinValue,
            };

            var result = await Add(item);
            return result;
        }

        public async Task<IEnumerable<Permissions>> GetList()
        {
            return await GetAll();
        }

        public async Task<int> DeletePermissions(string id)
        {
            var item = await GetById(id);
            var result = await Remove(item);
            return result;
        }

        public async Task<IEnumerable<Permissions>> GetPermissionsByModule(string module)
        {
            List<Permissions> per = new List<Permissions>();
            per = (from permissions in _context.Permissions
                   where permissions.Module == module
                   select permissions).ToList();

            return per;
        }
        public async Task<int> UpdatePermissions(PermissionsModel model)
        {
            var item = await GetById(model.Id);
            if (!model.Name.IsNullOrEmpty())
                item.Name = model.Name;
            if (!model.Module.IsNullOrEmpty())
                item.Module = model.Module;
            item.UpdatedAt = DateTime.Now;

            var result = await Update(item);
            return result;
        }

        public async Task<Permissions> GetPermissions(string id)
        {
            var item = await GetById(id);
            return item;
        }
    }
}
