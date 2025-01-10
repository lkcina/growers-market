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
        private readonly IPerenualService _perenualService;

        public SpeciesController(IPerenualService perenualService)
        {
            _perenualService = perenualService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
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
            }
            var perenualDto = perenual.Select(species => species.ToSpeciesDto());
            return Ok(perenualDto);
        }
    }
}
