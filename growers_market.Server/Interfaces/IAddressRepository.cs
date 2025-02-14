using growers_market.Server.Models;

namespace growers_market.Server.Interfaces
{
    public interface IAddressRepository
    {
        Task<Address> CreateAddressAsync(AppUser appUser, Address address);
    }
}
