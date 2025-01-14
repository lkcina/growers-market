using growers_market.Server.Dtos.Listing;
using growers_market.Server.Models;

namespace growers_market.Server.Dtos.Chat
{
    public class ChatDto
    {
        public int Id { get; set; }
        public List<MessageDto> Messages { get; set; } = new List<MessageDto>();
        public int ListingId { get; set; }
        public ListingDto? Listing { get; set; }
        public string AppUserName { get; set; } = string.Empty;
    }
}
