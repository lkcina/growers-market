using growers_market.Server.Data;
using growers_market.Server.Interfaces;
using growers_market.Server.Models;

namespace growers_market.Server.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        private readonly AppDbContext _context;
        public AddressRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Address> CreateAddressAsync(AppUser appUser, Address address)
        {
            var newAddress = new Address
            {
                StreetAddressLine1 = address.StreetAddressLine1,
                StreetAddressLine2 = address.StreetAddressLine2,
                City = address.City,
                State = address.State,
                PostalCode = address.PostalCode,
                Latitude = address.Latitude,
                Longitude = address.Longitude,
                AppUserId = appUser.Id
            };
            await _context.Addresses.AddAsync(newAddress);
            await _context.SaveChangesAsync();
            return newAddress;
        }
    }
}
