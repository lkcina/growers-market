using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using growers_market.Server.Dtos.Address;
using growers_market.Server.Dtos.Species;
using growers_market.Server.Helpers;
using growers_market.Server.Interfaces;
using growers_market.Server.Mappers;
using growers_market.Server.Models;

namespace growers_market.Server.Services
{
    public class GoogleGeocodingService : IGoogleGeocodingService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        private readonly IGoogleGeocodingApi _googleGeocodingApi;
        public GoogleGeocodingService(HttpClient httpClient, IConfiguration config, IGoogleGeocodingApi googleGeocodingApi)
        {
            _httpClient = httpClient;
            _config = config;
            _googleGeocodingApi = googleGeocodingApi;
        }

        public async Task<Address> GetUserAddressLocation(AddressQueryObject queryObject)
        {
            var apiKey = _config["GoogleGeocodingKey"];
            var addressBuilder = new StringBuilder("");
            if (queryObject.StreetAddressLine1 != "")
            {
                addressBuilder.Append(queryObject.StreetAddressLine1 + ", ");
            }
            if (queryObject.StreetAddressLine2 != "")
            {
                addressBuilder.Append(queryObject.StreetAddressLine2 + ", ");
            }
            if (queryObject.City != "")
            {
                addressBuilder.Append(queryObject.City + ", ");
            }
            if (queryObject.State != "")
            {
                addressBuilder.Append(queryObject.State);
            }
            if (queryObject.PostalCode != "")
            {
                addressBuilder.Append(" " + queryObject.PostalCode);
            }

            var address = addressBuilder.ToString();
            var response = await _googleGeocodingApi.GetAddressAsync(apiKey, address);
            if (response != null && response.results.Count == 1)
            {
                var newAddress = response.ToAddressFromGoogleAddressDto();
                return newAddress;
            }
            return null;
        }

        public async Task<Address> GetCustomAddressLocation(string customAddress)
        {
            var apiKey = _config["GoogleGeocodingKey"];
            var address = customAddress.Replace(" ", "+");
            var response = await _googleGeocodingApi.GetAddressAsync(apiKey, address);

            if (response != null && response.results.Count == 1)
            {
                var newAddress = response.ToAddressFromGoogleAddressDto();
                return newAddress;
            }
            return null;
        }
    }
}
