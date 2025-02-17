using System.Text;
using System.Text.Json;
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
        public GoogleGeocodingService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        public async Task<Address> GetUserAddressLocation(AddressQueryObject queryObject)
        {
            try
            {
                var urlBuilder = new StringBuilder($"https://maps.googleapis.com/maps/api/geocode/json?key={_config["GoogleGeocodingKey"]}");

                if (queryObject.StreetAddressLine1 != "")
                {
                    var formattedStAddress1 = queryObject.StreetAddressLine1.Replace(" ", "+");
                    urlBuilder.Append($"&address={formattedStAddress1},+");
                }
                if (queryObject.StreetAddressLine2 != "")
                {
                    var formattedStAddress2 = queryObject.StreetAddressLine2.Replace(" ", "+");
                    urlBuilder.Append($"{formattedStAddress2},+");
                }
                if (queryObject.City != "")
                {
                    var formattedCity = queryObject.City.Replace(" ", "+");
                    urlBuilder.Append($"{formattedCity},+");
                }
                if (queryObject.State != "")
                {
                    var formattedState = queryObject.State.Replace(" ", "+");
                    urlBuilder.Append($"{formattedState}");
                }

                var url = urlBuilder.ToString();
                Console.WriteLine(url);
                var result = await _httpClient.GetAsync(url);
                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    if (content == null)
                    {
                        return null;
                    }
                    var tasks = JsonSerializer.Deserialize<GoogleAddressDto>(content);
                    Console.WriteLine(tasks.results[0].formatted_address);
                    if (tasks != null && tasks.results.Count == 1)
                    {
                        var address = tasks.ToAddressFromGoogleAddressDto();
                        Console.WriteLine("New Address Coordinates");
                        Console.WriteLine(address.Latitude);
                        Console.WriteLine(address.Longitude);
                        return address;
                    }
                    return null;
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception occurred: {ex.Message}");
                Console.WriteLine(ex.StackTrace);
                return null;
            }
        }

        public async Task<Address> GetCustomAddressLocation(string customAddress)
        {
            try
            {
                var urlBuilder = new StringBuilder($"https://maps.googleapis.com/maps/api/geocode/json?key={_config["GoogleGeocodingKey"]}&address={customAddress.Replace(" ", "+")}");

                var url = urlBuilder.ToString();
                Console.WriteLine(url);
                var result = await _httpClient.GetAsync(url);
                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    if (content == null)
                    {
                        return null;
                    }
                    var tasks = JsonSerializer.Deserialize<GoogleAddressDto>(content);
                    Console.WriteLine(tasks.results[0].formatted_address);
                    if (tasks != null && tasks.results.Count == 1)
                    {
                        var address = tasks.ToAddressFromGoogleAddressDto();
                        Console.WriteLine("New Address Coordinates");
                        Console.WriteLine(address.Latitude);
                        Console.WriteLine(address.Longitude);
                        return address;
                    }
                    return null;
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception occurred: {ex.Message}");
                Console.WriteLine(ex.StackTrace);
                return null;
            }
        }
    }
}
