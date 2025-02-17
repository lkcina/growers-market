using growers_market.Server.Dtos.Account;
using growers_market.Server.Helpers;
using growers_market.Server.Models;

namespace growers_market.Server.Interfaces
{
    public interface IGoogleGeocodingService
    {
        Task<Address> GetUserAddressLocation(AddressQueryObject queryObject);

        Task<Address> GetCustomAddressLocation(string customAddress);
    }
}
