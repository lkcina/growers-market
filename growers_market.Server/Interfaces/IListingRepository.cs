using growers_market.Server.Models;

namespace growers_market.Server.Interfaces
{
    public interface IListingRepository
    {
        Task<List<Listing>> GetAllListingsAsync(); // Add Query Object
        Task<List<Listing>> GetUserListingsAsync();
        Task<Listing> CreateAsync();
        Task<Listing> UpdateAsync();
        Task<Listing> DeleteAsync();
    }
}
