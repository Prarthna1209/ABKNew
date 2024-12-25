using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IPDNIRepository : IGenericRepository<PDNI>
    {
        Task<IEnumerable<PDNI>> GetList();
        Task<PDNI> GetPDNI(string id);
        Task<int> AddPDNI(PDNIModel PDNI);
        Task<int> UpdatePDNI(PDNIModel PDNI);
        Task<int> DeletePDNI(string id);
    }
}
