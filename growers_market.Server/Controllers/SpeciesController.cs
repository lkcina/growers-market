using growers_market.Server.Data;
using growers_market.Server.Interfaces;
using growers_market.Server.Mappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace growers_market.Server.Controllers
{
    [Route("api/species")]
    [ApiController]
    public class SpeciesController : ControllerBase
    {
        private readonly ISpeciesRepository _speciesRepository;

        public SpeciesController(ISpeciesRepository speciesRepo)
        {
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
            var speciesDto = species.Select(spec => spec.ToAllSpeciesDto());
            return Ok(speciesDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var species = await _speciesRepository.GetByIdAsync(id);
            if (species == null)
            {
                return NotFound();
            }
            var speciesDto = species.ToAllSpeciesDto();
            return Ok(speciesDto);
        }
    }
}
