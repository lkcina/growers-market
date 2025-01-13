using growers_market.Server.Extensions;
using growers_market.Server.Interfaces;
using growers_market.Server.Models;
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
        public ListingController(IListingRepository listingRepo, UserManager<AppUser> userManager, IPerenualService perenualService)
        {
            _listingRepository = listingRepo;
            _userManager = userManager;
            _perenualService = perenualService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllListings()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            var listings = await _listingRepository.GetAllListingsAsync(appUser);
            return Ok(listings);
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
            return Ok(listings);
        }
    }
}
