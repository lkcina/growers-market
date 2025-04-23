using AutoMapper;
using growers_market.Server.Dtos.Chat;
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
    [Route("api/chat")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatRepository _chatRepository;
        private readonly IListingRepository _listingRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public ChatController(IChatRepository chatRepo, UserManager<AppUser> userManager, IListingRepository listingRepository, IMapper mapper)
        {
            _chatRepository = chatRepo;
            _userManager = userManager;
            _listingRepository = listingRepository;
            _mapper = mapper;
        }

        [HttpGet("user")]
        [Authorize]
        public async Task<IActionResult> GetUserChats()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var chats = await _chatRepository.GetBuyerChats(appUser);
            Console.Write(chats.Count);
            var chatsDto = chats.Select(c => _mapper.Map<ChatDto>(c)).ToList();
            return Ok(chatsDto);
        }

        [HttpGet("listing/{listingId}")]
        [Authorize]
        public async Task<IActionResult> GetListingChats([FromRoute] int listingId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var listing = await _listingRepository.GetByIdAsync(listingId);

            var chats = await _chatRepository.GetListingChats(listingId);
            if (chats == null)
            {
                return NotFound();
            }
            if (listing.AppUserId == appUser.Id)
            {
                var chatsDto = chats.Select(c => _mapper.Map<ChatDto>(c)).ToList();
                return Ok(chatsDto);
            }

            return Unauthorized();
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetChatById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            var chat = await _chatRepository.GetChatById(id);
            if (chat == null)
            {
                return NotFound();
            }
            if (chat.AppUserId == appUser.Id || chat.Listing.AppUserId == appUser.Id)
            {
                var chatDto = _mapper.Map<ChatDto>(chat);
                return Ok(chatDto);
            }

            return Unauthorized();
        }

        [HttpPost("new/{listingId}")]
        [Authorize]
        public async Task<IActionResult> CreateChat([FromRoute] int listingId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var chat = new Chat
            {
                ListingId = listingId
            };
            var listing = await _listingRepository.GetByIdAsync(chat.ListingId);
            chat.Listing = listing;
            chat.AppUserName = appUser.UserName;
            chat.AppUserId = appUser.Id;
            await _chatRepository.CreateChat(chat);
            if (chat == null)
            {
                return StatusCode(500, "Failed to create chat");
            }
            return CreatedAtAction(nameof(GetChatById), new { id = chat.Id }, _mapper.Map<ChatDto>(chat));
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteChat([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var chat = await _chatRepository.GetChatById(id);
            if (chat == null)
            {
                return NotFound();
            }
            if (chat.AppUserId == appUser.Id || chat.Listing.AppUserId == appUser.Id)
            {
                var deletedChat = await _chatRepository.DeleteChat(id);
                if (deletedChat == null)
                {
                    return StatusCode(500, "Failed to delete chat");
                }
                return Ok(_mapper.Map<ChatDto>(deletedChat));
            }
            return Unauthorized();
        }
    }
}
