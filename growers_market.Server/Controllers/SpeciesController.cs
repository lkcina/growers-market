using growers_market.Server.Data;
using growers_market.Server.Helpers;
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
        private readonly IPerenualService _perenualService;

        public SpeciesController(ISpeciesRepository speciesRepo, IPerenualService perenualService)
        {
            _speciesRepository = speciesRepo;
            _perenualService = perenualService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var species = await _speciesRepository.GetAllAsync();
            var speciesDto = species.Select(spec => spec.ToSpeciesDto());
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
            var speciesDto = species.ToSpeciesDto();
            return Ok(speciesDto);
        }

        [HttpGet("perenual")]
        public async Task<IActionResult> GetAllPerenual([FromQuery] PerenualPlantQueryObject query)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var perenual = await _perenualService.PlantSearchAsync(query);
            if (perenual == null)
            {
                return StatusCode(500, "Something Went Wrong");
            }
            var perenualDto = perenual.Select(species => species.ToSpeciesDto());
            return Ok(perenualDto);
        }
    }
}
