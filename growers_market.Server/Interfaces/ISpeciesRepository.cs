using growers_market.Server.Models;

namespace growers_market.Server.Interfaces
{
    public interface ISpeciesRepository
    {
        Task<List<Species>> GetAllAsync();
        Task<Species> GetByIdAsync(int? id);
        Task<Species> CreateAsync(Species species);
    }
}
