using growers_market.Server.Dtos.Address;
using Refit;

namespace growers_market.Server.Interfaces
{
    public interface IGoogleGeocodingApi
    {
        [Get("/maps/api/geocode/json")]
        Task<GoogleAddressDto> GetAddressAsync(
            [AliasAs("key")] string apiKey,
            [AliasAs("address")] string? address = null
        );
    }
}
