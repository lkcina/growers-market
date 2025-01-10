using growers_market.Server.Dtos.Wishlist;
using growers_market.Server.Models;

namespace growers_market.Server.Mappers
{
    public static class WishlistMapper
    {
        public static WishlistDto ToWishlistDto(this Wishlist wishlist)
        {
            return new WishlistDto
            {
                SpeciesId = wishlist.SpeciesId
            };
        }
    }
}
