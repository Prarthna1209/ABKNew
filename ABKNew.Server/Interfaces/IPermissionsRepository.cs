using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IPermissionsRepository : IGenericRepository<Permissions>
    {
        Task<IEnumerable<Permissions>> GetList();
        Task<Permissions> GetPermissions(string id);
        Task<IEnumerable<Permissions>> GetPermissionsByModule(string module);
        Task<int> AddPermissions(PermissionsModel Permissions);
        Task<int> UpdatePermissions(PermissionsModel Permissions);
        Task<int> DeletePermissions(string id);
    }
}
