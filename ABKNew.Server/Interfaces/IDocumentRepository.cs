using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IDocumentsRepository : IGenericRepository<Documents>
    {
        Task<IEnumerable<Documents>> GetList(string SectionId);
        Task<Documents> GetDocuments(string id);
        Task<int> AddDocuments(DocumentsModel Documents);
        Task<int> UpdateDocuments(DocumentsModel Documents);
        Task<int> DeleteDocuments(string id);
    }
}
