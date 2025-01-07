using growers_market.Server.Data;
using growers_market.Server.Interfaces;
using growers_market.Server.Mappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace growers_market.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpeciesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ISpeciesRepository _speciesRepository;

        public SpeciesController(AppDbContext context, ISpeciesRepository speciesRepo)
        {
            _context = context;
            _speciesRepository = speciesRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var species = await _speciesRepository.GetAllAsync();
            var speciesDto = species.Select(spec => spec.ToSpeciesDto()).ToList();
            return Ok(speciesDto);
        }
    }
}
