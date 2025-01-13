using growers_market.Server.Data;
using growers_market.Server.Interfaces;
using growers_market.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace growers_market.Server.Repositories
{
    public class ListingRepository : IListingRepository
    {
        private readonly AppDbContext _context;
        public ListingRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Listing> CreateAsync(Listing listing)
        {
            await _context.Listings.AddAsync(listing);
            await _context.SaveChangesAsync();
            return listing;
        }

        public async Task<Listing> DeleteAsync(int id)
        {
            var listing = await _context.Listings.FirstOrDefaultAsync(l => l.Id ==id);
            if (listing == null)
            {
                return null;
            }

            _context.Listings.Remove(listing);
            await _context.SaveChangesAsync();
            return listing;
        }

        public async Task<List<Listing>> GetAllListingsAsync(AppUser appUser) // Add Query Object
        {
            var listings = _context.Listings.Include(l => l.AppUser).AsQueryable();

            if (appUser != null)
            {
                listings = listings.Where(l => l.AppUser.Id != appUser.Id);
            }

            return await listings.ToListAsync();
        }

        public async Task<List<Listing>> GetUserListingsAsync(AppUser appUser)
        {
            var listings = _context.Listings.Include(l => l.AppUser).AsQueryable();
            listings = listings.Where(l => l.AppUser.Id == appUser.Id);
            return await listings.ToListAsync();
        }

        public async Task<Listing> UpdateAsync(int id, Listing listing)
        {
            var currentListing = await _context.Listings.FirstOrDefaultAsync(l => l.Id == id);
            if (currentListing == null)
            {
                return null;
            }
            currentListing.Title = listing.Title;
            currentListing.IsForTrade = listing.IsForTrade;
            currentListing.Price = listing.Price;
            currentListing.Quantity = listing.Quantity;
            currentListing.Description = listing.Description;
            currentListing.SpeciesId = listing.SpeciesId;
            await _context.SaveChangesAsync();
            return currentListing;

        }
    }
}
