using growers_market.Server.Dtos.Chat;
using growers_market.Server.Models;

namespace growers_market.Server.Mappers
{
    public static class ChatMapper
    {
        public static ChatDto ToChatDto(this Chat chat)
        {
            return new ChatDto
            {
                Id = chat.Id,
                ListingId = chat.ListingId,
                Listing = chat.Listing.ToListingDto(),
                AppUserName = chat.AppUserName,
                Messages = chat.Messages.Select(m => m.ToMessageDto()).ToList()
            };
        }

        public static Chat ToChatFromCreateDto(this CreateChatRequestDto chatDto)
        {
            return new Chat
            {
                ListingId = chatDto.ListingId,
                
            };
        }
    }
}
