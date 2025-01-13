using growers_market.Server.Dtos.Listing;
using growers_market.Server.Extensions;
using growers_market.Server.Helpers;
using growers_market.Server.Interfaces;
using growers_market.Server.Mappers;
using growers_market.Server.Models;
using growers_market.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace growers_market.Server.Controllers
{
    [Route("api/listing")]
    [ApiController]
    public class ListingController : ControllerBase
    {
        private readonly IListingRepository _listingRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly IPerenualService _perenualService;
        private readonly ISpeciesRepository _speciesRepository;
        public ListingController(IListingRepository listingRepo, UserManager<AppUser> userManager, IPerenualService perenualService, ISpeciesRepository speciesRepository)
        {
            _listingRepository = listingRepo;
            _userManager = userManager;
            _perenualService = perenualService;
            _speciesRepository = speciesRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllListings([FromQuery] ListingQueryObject queryObject)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (!User.Identity.IsAuthenticated)
            {
                var allListings = await _listingRepository.GetAllListingsAsync(null, queryObject);
                var allListingsDto = allListings.Select(l => l.ToListingDto());
                return Ok(allListingsDto);
            }
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            var listings = await _listingRepository.GetAllListingsAsync(appUser, queryObject);
            var listingsDto = listings.Select(l => l.ToListingDto());
            return Ok(listingsDto);
        }

        [HttpGet("user")]
        [Authorize]
        public async Task<IActionResult> GetUserListings()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var listings = await _listingRepository.GetUserListingsAsync(appUser);
            var listingsDto = listings.Select(l => l.ToListingDto());
            return Ok(listingsDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var listing = await _listingRepository.GetByIdAsync(id);
            if (listing == null)
            {
                return NotFound();
            }
            var listingDto = listing.ToListingDto();
            return Ok(listingDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateListing([FromBody] CreateListingRequestDto listingDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var listing = listingDto.ToListingFromCreateDto();
            var species = await _speciesRepository.GetByIdAsync(listing.SpeciesId);
            if (species == null)
            {
                species = await _perenualService.GetPlantByIdAsync(listing.SpeciesId);
                if (species == null)
                {
                    return BadRequest("Species does not exist");
                }
                else
                {
                    await _speciesRepository.CreateAsync(species);
                }
            }
            listing.AppUserId = appUser.Id;
            listing.AppUserName = appUser.UserName;
            await _listingRepository.CreateAsync(listing);
            if (listing == null)
            {
                return StatusCode(500, "Failed to create listing");
            }
            return CreatedAtAction(nameof(GetById), new { id = listing.Id }, listing.ToListingDto());
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateListing([FromRoute] int id, [FromBody] UpdateListingRequestDto listingDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var species = await _speciesRepository.GetByIdAsync(listingDto.SpeciesId);
            if (species == null)
            {
                species = await _perenualService.GetPlantByIdAsync(listingDto.SpeciesId);
                if (species == null)
                {
                    return BadRequest("Species does not exist");
                }
                else
                {
                    await _speciesRepository.CreateAsync(species);
                }
            }
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var currentListing = await _listingRepository.GetByIdAsync(id);
            if (currentListing.AppUserId != appUser.Id)
            {
                return Unauthorized();
            }
            var listing = await _listingRepository.UpdateAsync(id, listingDto.ToListingFromUpdateDto());
            if (listing == null)
            {
                return NotFound("Listing not found");
            }
            return Ok(listing.ToListingDto());
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteListing([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var currentListing = await _listingRepository.GetByIdAsync(id);
            if (currentListing.AppUserId != appUser.Id)
            {
                return Unauthorized();
            }

            var listing = await _listingRepository.DeleteAsync(id);
            if (listing == null)
            {
                return NotFound("Listing not found");
            }
            return NoContent();
        }
    }
}
