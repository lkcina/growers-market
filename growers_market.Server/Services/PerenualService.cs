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
        private readonly IPerenualApi _perenualApi;
        public PerenualService(HttpClient httpClient, IConfiguration config, IMapper mapper, IPerenualApi perenualApi)
        {
            _httpClient = httpClient;
            _config = config;
            _mapper = mapper;
            _perenualApi = perenualApi;
        }

        public async Task<AllSpeciesDto> PlantSearchAsync(PerenualPlantQueryObject query)
        {
            var apiKey = _config["PerenualKey"];
            var edible = query.Edible.HasValue ? 1 : 0;
            var poisonous = query.Poisonous.HasValue ? 1 : 0;
            var indoor = query.Indoor.HasValue ? 1 : 0;

            var response = await _perenualApi.PlantSearchAsync(
                apiKey,
                query.Page,
                query.Q,
                query.Order,
                edible,
                poisonous,
                query.Cycle,
                query.Watering,
                query.Sunlight,
                indoor,
                query.Hardiness
            );
            var allSpeciesDto = response.ToAllSpeciesDtoFromPerenual(_mapper);
            return allSpeciesDto;
        }

        public async Task<Species> GetPlantByIdAsync(int? id)
        {
            if (id == null)
            {
                return null;
            }

            var apiKey = _config["PerenualKey"];
            var response = await _perenualApi.GetPlantById(id.Value, apiKey);
            var species = response.ToSpeciesFromDetailsPerenual();
            return species;
        }
    }
}
