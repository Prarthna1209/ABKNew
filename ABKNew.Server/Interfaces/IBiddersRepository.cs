using ABKNew.Server.Entities;
using ABKNew.Server.Models;

namespace ABKNew.Server.Interfaces
{
    public interface IBiddersRepository : IGenericRepository<Bidders>
    {
        Task<IEnumerable<Bidders>> GetList();
        Task<Bidders> GetBidders(int id);
        Task<int> AddBidders(BiddersModel Bidders);
        Task<int> UpdateBidders(BiddersModel Bidders);
        Task<int> DeleteBidders(int id);
    }
}
