using Microsoft.AspNetCore.Identity;

namespace growers_market.Server.Models
{
    public class AppUser : IdentityUser
    {
        public List<Listing> Listings { get; set; } = new List<Listing>();
        public List<Wishlist> Wishlists { get; set; } = new List<Wishlist>();
    }
}
