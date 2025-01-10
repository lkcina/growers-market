using growers_market.Server.Dtos.Species;
using growers_market.Server.Helpers;
using growers_market.Server.Interfaces;
using growers_market.Server.Mappers;
using growers_market.Server.Models;
using System.Text;
using System.Text.Json;

namespace growers_market.Server.Services
{
    public class PerenualService : IPerenualService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        public PerenualService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        public async Task<List<Species>> PlantSearchAsync(PerenualPlantQueryObject query)
        {
            try
            {
                var urlBuilder = new StringBuilder($"https://perenual.com/api/species-list?key={_config["PerenualKey"]}&page={query.Page}");

                if (!string.IsNullOrEmpty(query.Q))
                {
                    urlBuilder.Append($"&q={query.Q}");
                }
                if (!string.IsNullOrEmpty(query.Order))
                {
                    urlBuilder.Append($"&order={query.Order}");
                }
                if (query.Edible.HasValue)
                {
                    urlBuilder.Append($"&edible={query.Edible}");
                }
                if (query.Poisonous.HasValue)
                {
                    urlBuilder.Append($"&poisonous={query.Poisonous}");
                }
                if (!string.IsNullOrEmpty(query.Cycle))
                {
                    urlBuilder.Append($"&cycle={query.Cycle}");
                }
                if (!string.IsNullOrEmpty(query.Watering))
                {
                    urlBuilder.Append($"&watering={query.Watering}");
                }
                if (!string.IsNullOrEmpty(query.Sunlight))
                {
                    urlBuilder.Append($"&sunlight={query.Sunlight}");
                }
                if (query.Indoor.HasValue)
                {
                    urlBuilder.Append($"&indoor={query.Indoor}");
                }
                if (query.Hardiness.HasValue)
                {
                    urlBuilder.Append($"&hardiness={query.Hardiness}");
                }

                var url = urlBuilder.ToString();
                var result = await _httpClient.GetAsync(url);
                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    if (content == null)
                    {
                        return null;
                    }
                    var tasks = JsonSerializer.Deserialize<AllPerenualSpecies>(content);
                    if (tasks != null)
                    {
                        var speciesPerenual = tasks.data.ToList<AllSpeciesData>();
                        var species = speciesPerenual.Select(perenual => perenual.ToSpeciesFromPerenual());
                        
                        return speciesPerenual.Select(perenual => perenual.ToSpeciesFromPerenual()).ToList();
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

        public async Task<Species> GetPlantByIdAsync(int id)
        {
            try
            {
                var url = $"https://perenual.com/api/species/{id}?key={_config["PerenualKey"]}";
                var result = await _httpClient.GetAsync(url);
                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    if (content == null)
                    {
                        return null;
                    }
                    var speciesData = JsonSerializer.Deserialize<DetailsSpeciesData>(content);
                    if (speciesData != null)
                    {
                        return speciesData.ToSpeciesFromDetailsPerenual();
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
