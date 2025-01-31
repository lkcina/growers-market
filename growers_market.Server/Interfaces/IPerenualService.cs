using growers_market.Server.Dtos.Species;
using growers_market.Server.Helpers;
using growers_market.Server.Models;

namespace growers_market.Server.Interfaces
{
    public interface IPerenualService
    {
        Task<AllSpeciesDto> PlantSearchAsync(PerenualPlantQueryObject queryObject);
        Task<Species> GetPlantByIdAsync(int? id);
    }
}
