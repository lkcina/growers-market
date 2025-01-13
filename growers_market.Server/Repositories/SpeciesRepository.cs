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

        public async Task<Species> GetByIdAsync(int? id)
        {
            if (id == null)
            {
                return null;
            }
            var species = await _context.Species.FirstOrDefaultAsync(spec => spec.Id == id);
            if (species == null)
            {
                return null;
            }
            return species;
        }

        public async Task<Species> CreateAsync(Species species)
        {
            await _context.Species.AddAsync(species);
            _context.Database.OpenConnection();
            try
            {
                _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Species ON");
                await _context.SaveChangesAsync();
                _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Species OFF");
            }
            finally
            {
                _context.Database.CloseConnection();
            }
            return species;
        }
    }
}
