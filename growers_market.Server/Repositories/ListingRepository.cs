using growers_market.Server.Data;
using growers_market.Server.Helpers;
using growers_market.Server.Interfaces;
using growers_market.Server.Models;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<List<Listing>> GetAllListingsAsync(AppUser appUser, ListingQueryObject query)
        {
            var listings = _context.Listings.Include(l => l.AppUser).Include(l => l.Species).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Q))
            {
                listings = listings.Where(l => l.Title.Contains(query.Q) || l.Description.Contains(query.Q) || l.Species.CommonName.Contains(query.Q) || l.Species.ScientificName.Any(n => n.Contains(query.Q)) || l.Species.Description.Contains(query.Q));
            }
            if (query.IsForTrade.HasValue)
            {
                listings = listings.Where(l => l.IsForTrade == query.IsForTrade);
            }
            
            if (query.PriceMax.HasValue)
            {
                listings = listings.Where(l => l.Price <= query.PriceMax);
            }
            if (!string.IsNullOrWhiteSpace(query.AppUserName))
            {
                listings = listings.Where(l => l.AppUserName == query.AppUserName);
            }
            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                switch (query.SortBy)
                {
                    case "price":
                        listings = listings.OrderBy(l => l.Price);
                        break;
                    case "priceDesc":
                        listings = listings.OrderByDescending(l => l.Price);
                        break;
                    case "dateAsc":
                        listings = listings.OrderBy(l => l.CreatedAt);
                        break;
                    default:
                        listings = listings.OrderByDescending(l => l.CreatedAt);
                        break;
                }
            }
            var skipNumber = (query.Page - 1) * query.PageSize;

            if (appUser != null)
            {
                listings = listings.Where(l => l.AppUser.Id != appUser.Id);
            }

            return await listings.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Listing> GetByIdAsync(int id)
        {
            return await _context.Listings.Include(l => l.Species).Include(l => l.AppUser).FirstOrDefaultAsync(l => l.Id == id);
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
