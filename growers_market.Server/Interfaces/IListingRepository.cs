using growers_market.Server.Helpers;
using growers_market.Server.Models;

namespace growers_market.Server.Interfaces
{
    public interface IListingRepository
    {
        Task<List<Listing>> GetAllListingsAsync(AppUser appUser, ListingQueryObject queryObject);
        Task<List<Listing>> GetUserListingsAsync(AppUser appUser);
        Task<Listing> GetByIdAsync(int id);
        Task<Listing> CreateAsync(Listing listing);
        Task<Listing> UpdateAsync(int id, Listing listing);
        Task<Listing> DeleteAsync(int id);
    }
}
