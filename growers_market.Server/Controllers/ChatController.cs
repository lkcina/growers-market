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
        private readonly UserManager<AppUser> _userManager;

        public ChatController(IChatRepository chatRepo, UserManager<AppUser> userManager)
        {
            _chatRepository = chatRepo;
            _userManager = userManager;
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
            var chatsDto = chats.Select(c => c.ToChatDto()).ToList();
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

            var chats = await _chatRepository.GetListingChats(listingId);
            var chatsDto = chats.Select(c => c.ToChatDto()).ToList();
            return Ok(chatsDto);
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
                var chatDto = chat.ToChatDto();
                return Ok(chatDto);
            }

            return Unauthorized();
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateChat([FromBody] CreateChatRequestDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var chat = createDto.ToChatFromCreateDto();
            chat.AppUserName = appUser.UserName;
            chat.AppUserId = appUser.Id;
            var createdChat = await _chatRepository.CreateChat(chat);
            if (createdChat == null)
            {
                return StatusCode(500, "Failed to create chat");
            }
            return CreatedAtAction(nameof(GetChatById), new { id = chat.Id }, chat.ToChatDto());
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
                return Ok(deletedChat.ToChatDto());
            }
            return Unauthorized();
        }
    }
}
