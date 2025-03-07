﻿using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IUserRolesRepository : IGenericRepository<UserRoles>
    {
        Task<IEnumerable<UserRoles>> GetList();
        Task<UserRoles> GetUserRoles(string id);
        Task<int> AddUserRoles(UserRolesModel UserRoles);
        Task<int> UpdateUserRoles(UserRolesModel UserRoles);
        Task<int> DeleteUserRoles(string id);
    }
}
