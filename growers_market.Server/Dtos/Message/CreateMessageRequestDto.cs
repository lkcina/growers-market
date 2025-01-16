using growers_market.Server.Models;

namespace growers_market.Server.Dtos.Message
{
    public class CreateMessageRequestDto
    {
        public string Content { get; set; } = string.Empty;
        public int ChatId { get; set; }
    }
}
