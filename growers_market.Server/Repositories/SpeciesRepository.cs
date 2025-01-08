using growers_market.Server.Data;
using growers_market.Server.Interfaces;
using growers_market.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace growers_market.Server.Repositories
{
    public class SpeciesRepository : ISpeciesRepository
    {
        private readonly AppDbContext _context;
        public SpeciesRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Species>> GetAllAsync()
        {
            var species = await _context.Species.ToListAsync();
            return species;
        }

        public async Task<Species> GetByIdAsync(int id)
        {
            var species = await _context.Species.FirstOrDefaultAsync(spec => spec.Id == id);
            if (species == null)
            {
                return null;
            }
            return species;
        }
    }
}
