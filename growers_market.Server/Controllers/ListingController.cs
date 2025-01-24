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
        private readonly IFileService _fileService;
        public ListingController(IListingRepository listingRepo, UserManager<AppUser> userManager, IPerenualService perenualService, ISpeciesRepository speciesRepository, IFileService fileService)
        {
            _listingRepository = listingRepo;
            _userManager = userManager;
            _perenualService = perenualService;
            _speciesRepository = speciesRepository;
            _fileService = fileService;
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
            var listingsDto = listings.Select(l => l.ToListingDto()).ToList();
            return Ok(listingsDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
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
        public async Task<IActionResult> CreateListing([FromForm] ListingFormDto formListingDto)
        {
            Console.WriteLine("11111111111111111111111111111111111111111111111111111111111111");
            var listingDto = formListingDto.ToCreateListingRequestDtoFromListingFormDto();
            Console.WriteLine(listingDto.Title);
            Console.WriteLine(listingDto.IsForTrade);
            Console.WriteLine(listingDto.Price);
            Console.WriteLine(listingDto.Quantity);
            Console.WriteLine(listingDto.SpeciesId);
            Console.WriteLine(listingDto.Description);
            Console.WriteLine(listingDto.UploadedImages[0].FileName);
            if (!ModelState.IsValid)
            {
                Console.WriteLine("22222222222222222222222222222222222222222222222222222222222222222222");
                return BadRequest(ModelState);
            }

            if (listingDto.UploadedImages.Count + listingDto.ImagePaths.Count > 5)
            {
                Console.WriteLine("33333333333333333333333333333333333333333333333333333333333333");
                return BadRequest("You can only upload 5 images");
            }
            List<string> newImagePaths = new List<string>();
            foreach (var image in listingDto.UploadedImages)
            {
                if (image.Length > 1 * 1024 * 1024)
                {
                    Console.WriteLine("44444444444444444444444444444444444444444444444444444444444444");
                    return BadRequest("File size cannot exceed 1 MB");
                }
                var extension = Path.GetExtension(image.FileName);
                if (extension != ".jpg" && extension != ".png" && extension != ".jpeg")
                {
                    Console.WriteLine("555555555555555555555555555555555555555555555555555555555555");
                    return BadRequest("Only .jpg, .jpeg, and .png file types are supported");
                }
                newImagePaths.Add(await _fileService.SaveFileAsync(image, "ListingImages"));
                Console.WriteLine(image.FileName);
            }
            foreach (var image in newImagePaths)
            {
                Console.WriteLine($"path: {image}");
            }

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var listing = listingDto.ToListingFromCreateDto();
            var species = await _speciesRepository.GetByIdAsync(listing.SpeciesId);
            if (species == null)
            {
                
                species = await _perenualService.GetPlantByIdAsync(listing.SpeciesId);
                Console.WriteLine(species.ToString());
                if (species == null)
                {
                    Console.WriteLine("6666666666666666666666666666666666666666666666666666666666666");
                    return BadRequest("Species does not exist");
                }
                else
                {
                    await _speciesRepository.CreateAsync(species);
                }
            }
            listing.AppUserId = appUser.Id;
            listing.AppUserName = appUser.UserName;
            listing.Images = listingDto.ImagePaths.Concat(newImagePaths).ToList();
            Console.WriteLine(listing.Title);
            Console.WriteLine(listing.IsForTrade);
            Console.WriteLine(listing.Price);
            Console.WriteLine(listing.Quantity);
            Console.WriteLine(listing.SpeciesId);
            Console.WriteLine(listing.Description);
            Console.WriteLine(listing.Images[0]);
            Console.WriteLine(listing.Images[1]);
            await _listingRepository.CreateAsync(listing);
            if (listing == null)
            {
                Console.WriteLine("77777777777777777777777777777777777777777777777777777777777777777");
                return StatusCode(500, "Failed to create listing");
            }
            Console.WriteLine("8888888888888888888888888888888888888888888888888888888888888888");
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

            if (listingDto.Images.Count > 5)
            {
                return BadRequest("You can only upload 5 images");
            }
            List<string> imagePaths = new List<string>();
            foreach (var image in listingDto.Images)
            {
                if (image.Length > 1 * 1024 * 1024)
                {
                    return BadRequest("File size cannot exceed 1 MB");
                }
                var extension = Path.GetExtension(image.FileName);
                if (extension != ".jpg" && extension != ".png" && extension != ".jpeg")
                {
                    return BadRequest("Only .jpg, .jpeg, and .png file types are supported");
                }
                imagePaths.Add(await _fileService.SaveFileAsync(image, "ListingImages"));
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
            var listing = listingDto.ToListingFromUpdateDto();
            listing.Images = imagePaths;
            await _listingRepository.UpdateAsync(id, listing);
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
