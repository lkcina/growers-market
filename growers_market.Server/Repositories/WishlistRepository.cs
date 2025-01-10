using growers_market.Server.Data;
using growers_market.Server.Dtos.Species;
using growers_market.Server.Interfaces;
using growers_market.Server.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<List<Species>> GetUserWishlistAsync(AppUser user)
        {
            return await _context.Wishlists.Where(u => u.AppUserId == user.Id)
            .Select(species => new Species
            {
                Id = species.SpeciesId,
                CommonName = species.Species.CommonName,
                ScientificName = species.Species.ScientificName,
                Cycle = species.Species.Cycle,
                Watering = species.Species.Watering,
                Sunlight = species.Species.Sunlight,
                HardinessMin = species.Species.HardinessMin,
                HardinessMax = species.Species.HardinessMax,
                Indoor = species.Species.Indoor,
                Image = species.Species.Image,
                Thumbnail = species.Species.Thumbnail
            }).ToListAsync();
        }
    }
}
