using growers_market.Server.Dtos.Species;
using growers_market.Server.Models;
using Refit;

namespace growers_market.Server.Interfaces
{
    public interface IPerenualApi
    {
        [Get("/api/species-list")]
        Task<AllPerenualSpecies> PlantSearchAsync(
            [AliasAs("key")] string apiKey,
            [AliasAs("page")] int page,
            [AliasAs("q")] string? query = null,
            [AliasAs("order")] string? order = null,
            [AliasAs("edible")] int? edible = null,
            [AliasAs("poisonous")] int? poisonous = null,
            [AliasAs("cycle")] string? cycle = null,
            [AliasAs("watering")] string? watering = null,
            [AliasAs("sunlight")] string? sunlight = null,
            [AliasAs("indoor")] int? indoor = null,
            [AliasAs("hardiness")] int? hardiness = null
        );

        [Get("/api/species/details/{id}")]
        Task<DetailsSpeciesData> GetPlantById(
            int id,
            [AliasAs("key")] string apiKey
        );
    }
}
