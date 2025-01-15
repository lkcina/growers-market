using System;
using growers_market.Server.Dtos.Message;
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
    [Route("api/message")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageRepository _messageRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly IChatRepository _chatRepository;
        public MessageController(IMessageRepository messageRepository, UserManager<AppUser> userManager, IChatRepository chatRepository)
        {
            _messageRepository = messageRepository;
            _userManager = userManager;
            _chatRepository = chatRepository;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateMessage([FromBody] CreateMessageRequestDto createMessageRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var chat = await _chatRepository.GetChatById(createMessageRequestDto.ChatId);

            if (chat.AppUserId != appUser.Id && chat.Listing.AppUserId != appUser.Id)
            {
                return Unauthorized();
            }

            var message = createMessageRequestDto.ToMessageFromCreateDto();
            message.AppUserId = appUser.Id;
            message.AppUserName = appUser.UserName;

            await _messageRepository.CreateAsync(message);
            if (message == null)
            {
                return StatusCode(500, "Failed to create message");
            }
            return Created();
        }
    }
}
