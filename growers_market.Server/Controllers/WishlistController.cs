using growers_market.Server.Extensions;
using growers_market.Server.Interfaces;
using growers_market.Server.Mappers;
using growers_market.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace growers_market.Server.Controllers
{
    [Route("api/wishlist")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly IWishlistRepository _wishlistRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly ISpeciesRepository _speciesRepository;
        private readonly IPerenualService _perenualService;
        public WishlistController(IWishlistRepository wishlistRepo, UserManager<AppUser> userManager, ISpeciesRepository speciesRepo, IPerenualService perenualService)
        {
            _wishlistRepository = wishlistRepo;
            _userManager = userManager;
            _speciesRepository = speciesRepo;
            _perenualService = perenualService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserWishlist()
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var wishlist = await _wishlistRepository.GetUserWishlistAsync(appUser);
            return Ok(wishlist);
        }

        [HttpPost("{speciesId}")]
        [Authorize]
        public async Task<IActionResult> AddWishlist([FromRoute] int speciesId)
        {
            Console.WriteLine("ID:" + speciesId);
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var species = await _speciesRepository.GetByIdAsync(speciesId);
            if (species == null)
            {
                species = await _perenualService.GetPlantByIdAsync(speciesId);
                if (species == null)
                {
                    return BadRequest("Species does not exist");
                }
                else
                {
                    await _speciesRepository.CreateAsync(species);
                }
            }
            if (species == null)
            {
                return BadRequest("Species not found");
            }
            var userWishlist = await _wishlistRepository.GetUserWishlistAsync(appUser);
            if (userWishlist.Any(item => item.Id == species.Id))
            {
                return BadRequest("Species already in wishlist");
            }

            var wishlist = new Wishlist
            {
                SpeciesId = species.Id,
                AppUserId = appUser.Id
            };

            await _wishlistRepository.CreateAsync(wishlist);
            if (wishlist == null)
            {
                return StatusCode(500, "Failed to add species to wishlist");
            }
            else
            {
                return Created();
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var wishlist = await _wishlistRepository.DeleteAsync(appUser, id);
            if (wishlist == null)
            {
                return NotFound("Species not found in wishlist");
            }
            return NoContent();
        }
    }
}
