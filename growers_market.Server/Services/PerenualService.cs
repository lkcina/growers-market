using AutoMapper;
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
        private readonly IMapper _mapper;
        public PerenualService(HttpClient httpClient, IConfiguration config, IMapper mapper)
        {
            _httpClient = httpClient;
            _config = config;
            _mapper = mapper;
        }

        public async Task<AllSpeciesDto> PlantSearchAsync(PerenualPlantQueryObject query)
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
                    var edible = query.Edible.Value ? 1 : 0;
                    urlBuilder.Append($"&edible={edible}");
                }
                if (query.Poisonous.HasValue)
                {
                    var poisonous = query.Poisonous.Value ? 1 : 0;
                    urlBuilder.Append($"&poisonous={poisonous}");
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
                    var indoor = query.Indoor.Value ? 1 : 0;
                    urlBuilder.Append($"&indoor={indoor}");
                }
                if (query.Hardiness.HasValue)
                {
                    urlBuilder.Append($"&hardiness={query.Hardiness}");
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
                    var tasks = JsonSerializer.Deserialize<AllPerenualSpecies>(content);
                    if (tasks != null)
                    {
                        var species = tasks.ToAllSpeciesDtoFromPerenual(_mapper);
                        
                        return species;
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

        public async Task<Species> GetPlantByIdAsync(int? id)
        {
            if (id == null)
            {
                return null;
            }
            try
            {
                var url = $"https://perenual.com/api/species/details/{id}?key={_config["PerenualKey"]}";
                Console.WriteLine(url);
                var result = await _httpClient.GetAsync(url);
                Console.WriteLine(result);
                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    

                    if (string.IsNullOrWhiteSpace(content))
                    {
                        return null;
                    }
                    var options = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    };

                    var speciesData = JsonSerializer.Deserialize<DetailsSpeciesData>(content, options);
                    if (speciesData != null)
                    {
                        return speciesData.ToSpeciesFromDetailsPerenual();
                    }
                    return null;
                }
                return null;
            }
            catch (JsonException ex)
            {
                Console.WriteLine($"Exception occurred: {ex.Message}");
                Console.WriteLine(ex.StackTrace);
                return null;
            }
        }
    }
}
