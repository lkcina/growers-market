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
        public WishlistController(IWishlistRepository wishlistRepo, UserManager<AppUser> userManager, ISpeciesRepository speciesRepo)
        {
            _wishlistRepository = wishlistRepo;
            _userManager = userManager;
            _speciesRepository = speciesRepo;

        }

        
    }
}
