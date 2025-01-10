using growers_market.Server.Extensions;
using growers_market.Server.Interfaces;
using growers_market.Server.Models;
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

        [HttpPost]
        public async Task<IActionResult> AddWishlist(int id)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var species = await _speciesRepository.GetByIdAsync(id);
            if (species == null)
            {
                species = await _perenualService.GetPlantByIdAsync(id);
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
            if (userWishlist.Any(item => item.SpeciesId == species.Id))
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
    }
}
