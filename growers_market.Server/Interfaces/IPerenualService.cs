using growers_market.Server.Helpers;
using growers_market.Server.Models;

namespace growers_market.Server.Interfaces
{
    public interface IPerenualService
    {
        Task<List<Species>> PlantSearchAsync(PerenualPlantQueryObject queryObject);
    }
}
