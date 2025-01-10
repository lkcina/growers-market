using growers_market.Server.Models;

namespace growers_market.Server.Interfaces
{
    public interface ISpeciesRepository
    {
        Task<List<Species>> GetAllAsync(); // Add Queryable Object to allow for filtering
        Task<Species> GetByIdAsync(int id);
        Task<Species> CreateAsync(Species species);
    }
}
