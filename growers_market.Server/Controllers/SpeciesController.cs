using growers_market.Server.Data;
using growers_market.Server.Helpers;
using growers_market.Server.Interfaces;
using growers_market.Server.Mappers;
using growers_market.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace growers_market.Server.Controllers
{
    [Route("api/species")]
    [ApiController]
    public class SpeciesController : ControllerBase
    {
        private readonly IPerenualService _perenualService;
        private readonly ISpeciesRepository _speciesRepository;

        public SpeciesController(IPerenualService perenualService, ISpeciesRepository speciesRepo)
        {
            _perenualService = perenualService;
            _speciesRepository = speciesRepo;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPerenualById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var perenual = await _perenualService.GetPlantByIdAsync(id);
            if (perenual == null)
            {
                return StatusCode(500, "Species is unavailable");
            }
            var perenualDto = perenual.ToSpeciesDto();
            return Ok(perenualDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPerenual([FromQuery] PerenualPlantQueryObject query)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var perenual = await _perenualService.PlantSearchAsync(query);
            if (perenual == null)
            {
                return StatusCode(500, "One or more species are unavailable");
            };
            return Ok(perenual);
        }

        [HttpGet("used")]
        public async Task<IActionResult> GetAllUsedSpecies()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var species = await _speciesRepository.GetAllAsync();
            var speciesDto = species.Select(species => species.ToSpeciesDto()).ToList();
            return Ok(speciesDto);
        }

        [HttpGet("used/{id}")]
        public async Task<IActionResult> GetById([FromRoute] int it)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var species = await _speciesRepository.GetByIdAsync(it);
            if (species == null)
            {
                return NotFound();
            }
            var speciesDto = species.ToSpeciesDto();
            return Ok(speciesDto);
        }

        [HttpPost("{id}")]
        [Authorize]
        public async Task<IActionResult> AddSpecies([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var species = await _speciesRepository.GetByIdAsync(id);
            if (species != null)
            {
                return StatusCode(500, "Species Already Exists");
            }
            var perenualSpecies = await _perenualService.GetPlantByIdAsync(id);
            var createdSpecies = await _speciesRepository.CreateAsync(perenualSpecies);
            if (createdSpecies == null)
            {
                return StatusCode(500, "Species could not be added");
            }
            var speciesDto = createdSpecies.ToSpeciesDto();
            return CreatedAtAction(nameof(GetById), new { id = createdSpecies.Id }, createdSpecies.ToSpeciesDto());
        }
    }
}
