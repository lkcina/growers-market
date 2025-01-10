using growers_market.Server.Models;

namespace growers_market.Server.Interfaces
{
    public interface IWishlistRepository
    {
        Task<List<Species>> GetUserWishlistAsync(AppUser user);
        Task<Wishlist> CreateAsync(Wishlist wishlist);
        Task<Wishlist> DeleteAsync(AppUser appuser, int speciesId);
    }
}
