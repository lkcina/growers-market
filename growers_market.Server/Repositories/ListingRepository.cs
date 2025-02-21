using System.Text.Json;
using System.Text.Json.Serialization;
using growers_market.Server.Data;
using growers_market.Server.Dtos.Listing;
using growers_market.Server.Helpers;
using growers_market.Server.Interfaces;
using growers_market.Server.Mappers;
using growers_market.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace growers_market.Server.Repositories
{
    public class ListingRepository : IListingRepository
    {
        private readonly AppDbContext _context;
        private readonly IChatRepository _chatRepository;
        private readonly IFileService _fileService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IGoogleGeocodingService _googleGeocodingService;
        public ListingRepository(AppDbContext context, IChatRepository chatRepository, IFileService fileService, UserManager<AppUser> userManager, IGoogleGeocodingService googleGeocodingService)
        {
            _context = context;
            _chatRepository = chatRepository;
            _fileService = fileService;
            _userManager = userManager;
            _googleGeocodingService = googleGeocodingService;
        }

        private static double CalculateDistance(string unit, double lat1, double lon1, double lat2, double lon2)
        {
            Console.WriteLine(lat1);
            Console.WriteLine(lon1);
            Console.WriteLine(lat2);
            Console.WriteLine(lon2);
            const double R = 6371; // Radius of the Earth in kilometers
            var lat = (lat2 - lat1) * Math.PI / 180;
            var lon = (lon2 - lon1) * Math.PI / 180;
            var a = Math.Sin(lat / 2) * Math.Sin(lat / 2) +
                    Math.Cos(lat1 * Math.PI / 180) * Math.Cos(lat2 * Math.PI / 180) *
                    Math.Sin(lon / 2) * Math.Sin(lon / 2);
            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            if (unit == "km")
            {
                var distanceInKm = R * c;
                Console.WriteLine(distanceInKm);
                return distanceInKm; // Distance in kilometers
            }
            var distanceInMiles = (R * c) * 0.62137119223734;
            Console.WriteLine(distanceInMiles);
            return distanceInMiles; // Distance in Miles
        }

        public async Task<Listing> CreateAsync(Listing listing)
        {
            Console.WriteLine(JsonSerializer.Serialize(listing));
            await _context.Listings.AddAsync(listing);
            Console.WriteLine("Added");
            try
            {
                await _context.SaveChangesAsync();
                Console.WriteLine("Saved");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving changes: {ex.Message}");
                throw;
            }
            Console.WriteLine("Saved");
            return listing;
        }

        public async Task<Listing> DeleteAsync(int id)
        {
            var listing = await _context.Listings.FirstOrDefaultAsync(l => l.Id ==id);
            if (listing == null)
            {
                return null;
            }
            var chats = await _chatRepository.GetListingChats(id);
            if (chats != null)
            {
                foreach (var chat in chats)
                {
                    await _chatRepository.DeleteChat(chat.Id);
                }
            }

            foreach (var image in listing.Images)
            {
                await _fileService.DeleteFile(image);
            }

            _context.Listings.Remove(listing);
            await _context.SaveChangesAsync();
            return listing;
        }

        public async Task<AllListingsDto> GetAllListingsAsync(AppUser appUser, ListingQueryObject query)
        {
            var listings = _context.Listings.Include(l => l.AppUser).ThenInclude(u => u.Address).Include(l => l.Species).AsQueryable();
            
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
            if (query.SpeciesId.HasValue)
            {
                listings = listings.Where(l => l.SpeciesId == query.SpeciesId);
            }
            
            switch (query.SortBy)
            {
                case "price":
                    listings = listings.OrderBy(l => l.Price);
                    break;
                case "priceDesc":
                    listings = listings.OrderByDescending(l => l.Price);
                    break;
                case "dateAsc":
                    Console.WriteLine("Date Asc");
                    listings = listings.OrderBy(l => l.CreatedAt);
                    break;
                default:
                    Console.WriteLine("Date Desc");
                    listings = listings.OrderByDescending(l => l.CreatedAt);
                    break;
            }

            

            var skipNumber = (query.Page - 1) * query.PageSize;

            if (appUser != null)
            {
                listings = listings.Where(l => l.AppUser.Id != appUser.Id);
            }

            var listingsList = listings.ToList();

            if (query.Location == "Home Address")
            {
                Console.WriteLine("Searching From: Home Address");
                Console.WriteLine($"{appUser.Address.StreetAddressLine1}, {appUser.Address.City}, {appUser.Address.State}, {appUser.Address.PostalCode}");
                Console.WriteLine(appUser.Address.Latitude);
                Console.WriteLine(appUser.Address.Longitude);
                listingsList = listingsList.Where(l => l.AppUser.Address != null && CalculateDistance(query.Unit, appUser.Address.Latitude, appUser.Address.Longitude, l.AppUser.Address.Latitude, l.AppUser.Address.Longitude) <= query.Radius).ToList();
            } else if (query.Location == "Current Location")
            {
                Console.WriteLine("Searching From: Current Location");
                Console.WriteLine(query.Latitude);
                Console.WriteLine(query.Longitude);
                listingsList = listingsList.Where(l => l.AppUser.Address != null && CalculateDistance(query.Unit, query.Latitude.Value, query.Longitude.Value, l.AppUser.Address.Latitude, l.AppUser.Address.Longitude) <= query.Radius).ToList();
            } else
            {
                var address = await _googleGeocodingService.GetCustomAddressLocation(query.Location);
                if (address != null)
                {
                    Console.WriteLine($"Searching From: {query.Location}");
                    Console.WriteLine($"{address.StreetAddressLine1}, {address.City}, {address.State}, {address.PostalCode}");
                    Console.WriteLine(address.Latitude);
                    Console.WriteLine(address.Longitude);
                    listingsList = listingsList.Where(l => l.AppUser.Address != null && CalculateDistance(query.Unit, address.Latitude, address.Longitude, l.AppUser.Address.Latitude, l.AppUser.Address.Longitude) <= query.Radius).ToList();
                } else
                {
                    return null;
                }
            }

            var totalListings = listingsList.Count;
            var listingsListDto = listingsList.Select(l => l.ToListingDto()).Skip(skipNumber).Take(query.PageSize).ToList();
            var listingsDto = new AllListingsDto
            {
                Data = listingsListDto,
                To = ((query.Page - 1) * query.PageSize) + listingsList.Count,
                PerPage = query.PageSize,
                CurrentPage = query.Page,
                From = skipNumber + 1,
                LastPage = (int)Math.Ceiling((double)totalListings / query.PageSize),
                Total = totalListings
            };

            return listingsDto;
        }

        public async Task<Listing> GetByIdAsync(int? id)
        {
            return await _context.Listings.Include(l => l.Species).Include(l => l.AppUser).FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task<List<Listing>> GetUserListingsAsync(AppUser appUser)
        {
            var listings = _context.Listings.Include(l => l.AppUser).Include(l => l.Species).AsQueryable();
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

            foreach (var image in currentListing.Images)
            {
                if (!listing.Images.Contains(image))
                {
                     await _fileService.DeleteFile(image);
                }
            }

            currentListing.Title = listing.Title;
            currentListing.IsForTrade = listing.IsForTrade;
            currentListing.Price = listing.Price;
            currentListing.Quantity = listing.Quantity;
            currentListing.Description = listing.Description;
            currentListing.SpeciesId = listing.SpeciesId;
            currentListing.Images = listing.Images;
            await _context.SaveChangesAsync();
            return currentListing;

        }
    }
}
