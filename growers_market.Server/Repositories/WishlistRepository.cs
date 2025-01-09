using growers_market.Server.Data;
using growers_market.Server.Interfaces;
using growers_market.Server.Models;

namespace growers_market.Server.Repositories
{
    public class WishlistRepository : IWishlistRepository
    {
        private readonly AppDbContext _context;

        public WishlistRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Wishlist> CreateAsync(Wishlist wishlist)
        {
            await _context.Wishlists.AddAsync(wishlist);
            await _context.SaveChangesAsync();
            return wishlist;
        }

        public async Task<Wishlist> DeleteAsync(AppUser appUser, int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Wishlist>> GetUserWishlistAsync(AppUser user)
        {
            throw new NotImplementedException();
        }
    }
}
