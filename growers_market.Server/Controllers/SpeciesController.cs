using AutoMapper;
using growers_market.Server.Data;
using growers_market.Server.Dtos.Species;
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
        private readonly IMapper _mapper;

        public SpeciesController(IPerenualService perenualService, ISpeciesRepository speciesRepo, IMapper mapper)
        {
            _perenualService = perenualService;
            _speciesRepository = speciesRepo;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPerenualById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Console.WriteLine("Getting species by id");
            var perenual = await _perenualService.GetPlantByIdAsync(id);
            Console.WriteLine(perenual.CommonName);
            if (perenual == null)
            {
                return StatusCode(500, "Species is unavailable");
            }
            var perenualDto = _mapper.Map<SpeciesDto>(perenual);
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
            var speciesDto = species.Select(species => _mapper.Map<SpeciesDto>(species)).ToList();
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
            var speciesDto = _mapper.Map<SpeciesDto>(species);
            return Ok(speciesDto);
        }

        [HttpGet("random")]
        public async Task<IActionResult> GetRandomSpecies()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var species = await _speciesRepository.GetAllAsync();
            var speciesDto = species.Select(species => _mapper.Map<SpeciesDto>(species)).ToList();
            var random = new Random();
            var pageSize = speciesDto.Count < 30 ? speciesDto.Count : 30;
            var randomSpecies = new List<SpeciesDto>();
            while (randomSpecies.Count < pageSize)
            {
                var index = random.Next(speciesDto.Count);
                if (randomSpecies.Contains(speciesDto[index]))
                {
                    continue;
                }
                randomSpecies.Add(speciesDto[index]);
            }
            var AllSpeciesDto = randomSpecies.ToAllSpeciesDtoFromSpeciesDtoList();

            return Ok(AllSpeciesDto);
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
            var speciesDto = _mapper.Map<SpeciesDto>(createdSpecies);
            return CreatedAtAction(nameof(GetById), new { id = createdSpecies.Id }, _mapper.Map<SpeciesDto>(createdSpecies));
        }
    }
}
