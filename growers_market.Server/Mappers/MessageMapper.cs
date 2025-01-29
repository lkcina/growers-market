using growers_market.Server.Dtos.Message;
using growers_market.Server.Models;

namespace growers_market.Server.Mappers
{
    public static class MessageMapper
    {
        public static MessageDto ToMessageDto(this Message message)
        {
            return new MessageDto
            {
                Id = message.Id,
                Content = message.Content,
                CreatedAt = message.CreatedAt,
                ChatId = message.ChatId,
                AppUserName = message.AppUserName
            };
        }

        public static Message ToMessageFromCreateDto(this CreateMessageRequestDto createMessageRequestDto)
        {
            return new Message
            {
                Content = createMessageRequestDto.Content,
                ChatId = createMessageRequestDto.ChatId
            };
        }
    }
}
