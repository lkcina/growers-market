using growers_market.Server.Data;
using growers_market.Server.Interfaces;
using growers_market.Server.Models;

namespace growers_market.Server.Repositories
{
    public class ListingRepository : IListingRepository
    {
        private readonly AppDbContext _appDbContext;

        public Task<Listing> CreateAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Listing> DeleteAsync()
        {
            throw new NotImplementedException();
        }

        public Task<List<Listing>> GetAllListingsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<List<Listing>> GetUserListingsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Listing> UpdateAsync()
        {
            throw new NotImplementedException();
        }
    }
}
