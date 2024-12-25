using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface ITakeoffDocumentsRepository : IGenericRepository<TakeoffDocuments>
    {
        Task<IEnumerable<TakeoffDocuments>> GetList();
        Task<TakeoffDocuments> GetTakeoffDocuments(string id);
        Task<int> AddTakeoffDocuments(TakeoffDocumentsModel TakeoffDocuments);
        Task<int> UpdateTakeoffDocuments(TakeoffDocumentsModel TakeoffDocuments);
        Task<int> DeleteTakeoffDocuments(string id);
    }
}
