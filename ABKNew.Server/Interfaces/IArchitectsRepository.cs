﻿using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IArchitectsRepository : IGenericRepository<Architects>
    {
        Task<IEnumerable<Architects>> GetList();
        Task<Architects> GetArchitects(string id);
        Task<int> AddArchitects(ArchitectsModel Architects);
        Task<int> UpdateArchitects(ArchitectsModel Architects);
        Task<int> DeleteArchitects(string id);
    }
}
